import { UserCollection } from "../db/models/User.js";

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


