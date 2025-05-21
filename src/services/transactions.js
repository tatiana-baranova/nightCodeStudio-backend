import { TransactionCollection } from "../db/models/Transaction.js";
import { CategoryCollection } from "../db/models/Categories.js";
import createHttpError from "http-errors";

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
    console.log('✓ Transaction created:', transaction);
    return transaction;
};

export const getAllTransactions = async (userId) => {
    const transactions = await TransactionCollection.find({ userId}).populate('category');
    return transactions;
};
