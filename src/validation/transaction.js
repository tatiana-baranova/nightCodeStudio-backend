import Joi from 'joi';

export const createTransactionSchema = Joi.object({
    type: Joi.string().valid('income', 'expenses').required(),
    category: Joi.string().required(),
    amount: Joi.number().min(0.01).max(1000000).required(),
    date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
    comment: Joi.string().min(2).max(100).allow('', null),
});
