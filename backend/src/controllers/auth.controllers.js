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
        return res.status(400).json({message: "Failed to register user!", error});
    }
}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        
        const user = await User.findOne({email});

        if(!user) return res.status(401).json({message: "Unauthorized access!"});

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid) return res.status(401).json({message: "Incorrect password!"});

        const token = jwt.sign({
            id: user._id,
            email: user.email
        }, process.env.JWT_SECRET);

        res.cookie("token", token);

        return res.status(200).json({
            message: "User logged in successfully!",
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            message: "Failed to login",
            error: error
        });
    }
}

const uploadFile = async (req, res) => {

}

export {
    registerUser,
    loginUser,
}