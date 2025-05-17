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
        ref: 'categories',
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
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
}, { timestamps: true, versionKey: false },
);
export const TransactionCollection = model('transaction', transactionSchema);
