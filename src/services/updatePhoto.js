import createHttpError from 'http-errors';
import { UserCollection } from '../db/models/User.js';

export const updateUserPhoto = async (userId, payload) => {
  if (!payload.photo) {
    throw createHttpError(400, 'Photo is required for update');
  }
  const updatedUser = await UserCollection.findOneAndUpdate(
    { _id: userId },
    { photo: payload.photo },
    { new: true, context: 'query' },
  ).select('-password');

  if (!updatedUser) {
    throw createHttpError(404, 'User not found');
  }

  return updatedUser;
};
