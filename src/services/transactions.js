import { TransactionCollection } from "../db/models/Transaction.js";
import { CategoryCollection } from "../db/models/Categories.js";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const createTransaction = async (userId, data) => {
    const { type, category, amount, date, comment } = data;

    const existingCategory = await CategoryCollection.findOne({ title: category });
    if (!existingCategory) {
        throw createHttpError(400, 'Category not found');
    }
    const transaction = await TransactionCollection.create({
        userId,
        type,
        category: existingCategory._id,
        amount,
        date,
        comment,
    });

    return transaction;
};

export const getAllTransactions = async (userId) => {
    const transactions = await TransactionCollection.find({ userId}).populate('category');
    return transactions;
};

export const deleteTransaction = (id, userId) => TransactionCollection.findOneAndDelete({ _id: id, userId });

export const updateTransaction = async (userAndTransactionId, payload, options = {}) => {
    const updateData = { ...payload };
    if (updateData.category) {
        const isValidObjectId = mongoose.Types.ObjectId.isValid(updateData.category);
    if (!isValidObjectId) {
        const categoryDoc = await CategoryCollection.findOne({ title: updateData.category });
        if (!categoryDoc) {
            throw createHttpError(400, 'Category not found');
        }
        updateData.category = categoryDoc._id;
        }
    }
    const rawResult = await TransactionCollection.findOneAndUpdate(
        userAndTransactionId,
        updateData,
        {
            new: true,
            ...options
        }
    ).populate('category', 'title');

    if (!rawResult) return null;
    return rawResult;
};
