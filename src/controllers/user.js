// import createHttpError from "http-errors";
import { updateUser } from '../services/user.js';
import { updateUserSchema } from "../validation/user.js";

export const getCurrentUser = async (req, res, next) => {
    try {
        console.log('req.user:', req.user);
        if (!req.user) {
            return res.status(401).json({
                status: 401,
                message: 'Not authorized',
                data: { message: 'Not authorized' },
            });
        }

        res.json({
            status: 200,
            message: 'User info',
            data: {
                id: req.user._id,
                email: req.user.email,
                name: req.user.name,
                balance: req.user.balance,
            },
        });
    } catch (error) {
        next(error);
    }
};


export const patchUser = async (req, res, next) => {
    try {
        const { error } = updateUserSchema.validate(req.body);
        if (error) {
        return res.status(400).json({
            status: 400,
            message: error.details[0].message,
        });
        }

        const userId = req.user._id;
        const payload = req.body;

        const updatedUser = await updateUser(userId, payload);
        if (!updatedUser) {
        return res.status(404).json({
            status: 404,
            message: 'User not found',
        });
        }

        const { password, ...safeUser } = updatedUser.toObject();
        res.status(200).json({
        status: 200,
        message: 'User updated successfully',
        data: safeUser,
        });
    } catch (err) {
        if (err.name === 'CastError') {
        return res.status(400).json({
            status: 400,
            message: 'ID is not valid',
        });
        }
        next(err);
    }
};


