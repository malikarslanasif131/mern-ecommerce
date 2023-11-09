import JTW from "jsonwebtoken";
import User from "../models/userModel.js";

export const requireSignin = (req, res, next) => {
    try {
        const decoded = JTW.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decoded;
        next();        
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error while authenticating user",
            error
        })
    }
}

export const isAdmin = async (req, res, next) => {
    try {
        const user =await User.findOne({ _id: req.user._id });
        console.log(user);
        if(!user.role == 0){
        return res.status(403).send({
            success: false,
            message: "You are not an admin"
        })}else{
            next();
        }
        
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Unauthrozion Access denied",
            error
        })
    }
        
    }
