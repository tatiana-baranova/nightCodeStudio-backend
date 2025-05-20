import mongoose from "mongoose";

const { Schema, model, Types } = mongoose;

const transactionSchema = new Schema({
    type: {
        type: String,
        required: true,
        enum: ['income', 'expenses'],
    },
    category: {
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
        ref: 'Users',
        required: true,
    },
}, {  timestamps: false, versionKey: false },
);
export const TransactionCollection = model('transaction', transactionSchema);
