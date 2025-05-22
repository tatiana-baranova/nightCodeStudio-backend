import { createTransactionSchema } from "../validation/transaction.js";
import { createTransaction, getAllTransactions, deleteTransaction } from "../services/transactions.js";
import createHttpError from "http-errors";

export const createNewTransactionController = async (req, res) => {
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

export const getAllTransactionsUserController = async (req, res) => {
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

export const deleteTransactionController = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;
    const transaction = await deleteTransaction(id, userId);
    if (!transaction) {
        throw createHttpError(404, 'Transaction not found');
    }
    res.status(204).send();
};
