import createHttpError from 'http-errors';
import { updateUser } from '../services/user.js';
import { updateUserSchema } from '../validation/user.js';
import { TransactionCollection } from '../db/models/Transaction.js';

export const getCurrentUser = async (req, res) => {
  if (!req.user) {
    throw createHttpError(401, 'Not authorized');
  }

  const transactions = await TransactionCollection.find({ userId: req.user._id });
  const balance = transactions.reduce((acc, tx) => {
    return tx.type === 'income' ? acc + tx.amount : acc - tx.amount;
  }, 0);
  res.json({
    status: 200,
    message: 'User profile retrieved successfully',
    data: {
      id: req.user._id,
      email: req.user.email,
      name: req.user.name,
      balance: Number(balance.toFixed(2)),
      photo: req.user.photo,
    },
  });
};

export const patchUser = async (req, res, next) => {
  const { error } = updateUserSchema.validate(req.body);
  if (error) {
    throw createHttpError(400, 'Username should have at least 2 characters');
  }
  const userId = req.user._id;
  const payload = req.body;
  const updatedUser = await updateUser(userId, payload);
  if (!updatedUser) {
    throw createHttpError(404, 'User not found');
  }
  const { password, ...safeUser } = updatedUser.toObject();
  res.status(200).json({
    status: 200,
    message: 'User updated successfully',
    data: safeUser,
  });
};
