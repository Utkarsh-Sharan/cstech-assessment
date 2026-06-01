import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
    try {
        const {fullName, email, password} = req.body;

        const userAlreadyExist = await User.findOne({email});

        if(userAlreadyExist)
            return res.status(409).json({message: "User already exists!"});

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            fullName,
            email,
            password: hashedPassword,
        });

        const token = jwt.sign({
            id: user._id,
            email: user.email,
        }, process.env.JWT_SECRET);

        res.cookie("token", token);

        return res.status(201).json({
            message: "User registered successfully!",
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
            }
        });
    } catch (error) {
        console.error("Failed to register user!", error);
    }
}

export {
    registerUser,
}