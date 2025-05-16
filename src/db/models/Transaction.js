import mongoose from "mongoose";

const { Schema, model, Types } = mongoose;

const transactionSchema = new Schema({
    type: {
        type: String,
        required: true,
        enum: ['income', 'expenses'],
    },
    categories: {
        type: Types.ObjectId,
        ref: 'Categories',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    comment: {
        type: String,
        default: '',
    },
    userId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true, versionKey: false },
);
export const TransactionCollection = model('transaction', transactionSchema);
