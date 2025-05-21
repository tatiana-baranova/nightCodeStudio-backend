import { createTransactionSchema } from "../validation/transaction.js";
import { createTransaction, getAllTransactions } from "../services/transactions.js";
import createHttpError from "http-errors";

export const createNewTransaction = async (req, res) => {
    const { error, value } = createTransactionSchema.validate(req.body);
    if (error) {
        throw createHttpError(400, error.details[0].message);
    }
    const transaction = await createTransaction(req.user._id, value);
    res.status(201).json({
        message: 'Transaction created',
        transaction,
    });
};

export const getAllTransactionsUser = async (req, res) => {
        const { _id: userId } = req.user;
        if (!userId) {
            throw new Error('userId is undefined!');
        }
    const transactions = await getAllTransactions(userId);
    res.status(200).json({
        message: 'Successfully all transactions',
        transactions,
    });
};
