// /me this is going to return the information back to the auth user
// /update-information to update user informations
import User from "../models/user.model.js";

export const getMe = async (req, res, next) => {
    const id = req.user;

    try {
        
        let user = await User.findById(id).populate("agencies");

        res.status(200).json({
            status: "success",
            user
        })

    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: "Something went wrong!",
            error
        })
    }
}

export const updateInformation = async (req, res, next) => {
    const id = req.user;

    const data = req.body;

    if(data.email || data.password) {
        res.status(400).json({
            status: "fail",
            message: "You can't update your email and password",
        })
    }

    try {

        let user = await User.findByIdAndUpdate({ _id: id }, data, {new: true});

        res.status(200).json({
            status: "success",
            message: "User information updated successfully!",
            user
        })
        
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: "Something went wrong!",
            error
        })
    }
}