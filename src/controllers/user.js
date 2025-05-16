import createHttpError from "http-errors";
import { getUserById, updateUser } from '../services/user.js';


export const getUserByIdController = async (req, res) => {
    const { userId } = req.params;
    console.log(userId);
    const userIdLog = req.user._id;
    const user = await getUserById(userId, userIdLog);
    if (!user) {
        throw new Error(404, "User not found");
    }
    res.json({
        status: 200,
        message: `Successfully found contact with id ${userId}!`,
        date: user,
    });

};
