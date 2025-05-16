import { UserCollection } from "../db/models/User.js";


export const getUserById = async (id, userId) =>
    UserCollection.findOne({ _id: id, userId });

export const updateUser = async (_id, payload, options = {}) => {
    const rewResult = await UserCollection.findByIdAndUpdate(
        _id,
        payload,
        {
            new: true,
            ...options
        }
    );
    if (!rewResult) return null;
    return rewResult;
};


