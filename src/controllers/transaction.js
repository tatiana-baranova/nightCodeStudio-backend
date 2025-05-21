import { createTransactionSchema } from "../validation/transaction.js";
import { createTransaction } from "../services/transactions.js";
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
