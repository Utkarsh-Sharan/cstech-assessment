import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";
import csv from "csv-parser";
import xlsx from "xlsx";
import { User } from "../models/user.model.js";
import { Task } from "../models/task.model.js";

const registerUser = async (req, res) => {
    try {
        const {fullName, email, phone, password, role} = req.body;

        const userAlreadyExist = await User.findOne({email});

        if(userAlreadyExist)
            return res.status(409).json({message: "User already exists!"});

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            fullName,
            email,
            phone,
            password: hashedPassword,
            role,
        });

        if(role === "admin") {
            const token = jwt.sign({
                id: user._id,
                email: user.email,
            }, process.env.JWT_SECRET);
            
            res.cookie("token", token);
        }

        return res.status(201).json({
            message: "User registered successfully!",
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                phone: user.phone,
                role: user.role,
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

        if(!user) return res.status(409).json({message: "User not found!"});

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
                phone: user.phone,
                role: user.role,
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

const getAllAgents = async (req, res) => {
    try {
        const agents = await User.find({role: "agent"});

        return res.status(200).json({
            message: "Fetched agents successfully!",
            agents,
        });
    } catch (error) {
        return res.status(400).json({message: "Failed to fetch agents!"}, error);
    }
}

const distributeTasks = async (tasks) => {
    try {
        const agents = await User.find({role: "agent"});
        if(!agents) return res.status(409).json({
            message: "No agents found",
            error,
        });

        const agentCount = agents.length;
        const taskCount = tasks.length;
        
        const perAgent = Math.floor(taskCount / agentCount);
        const remainder = taskCount % agentCount;

        let index = 0;

        for(let i = 0; i < agentCount; ++i) {
            let count = perAgent + (i < remainder ? 1 : 0);

            const assignedTasks = tasks.slice(index, index + count);
            index += count;

            for(let task of assignedTasks) {
                await Task.create({
                    agentId: agents[i]._id,
                    firstName: task.FirstName,
                    phone: task.Phone,
                    notes: task.Notes,
                });
            }
        }
    } catch (error) {
        console.error("Failed to distribute tasks!", error);
    }
}

const uploadFile = async (req, res) => {
    try {
        const filePath = req.file.path;
        const ext = path.extname(req.file.originalname).toLowerCase();

        let items = [];

        if(ext === ".csv") {
            fs.createReadStream(filePath)
                .pipe(csv())
                .on("data", (row) => {
                    items.push({
                        FirstName: row.FirstName,
                        Phone: row.Phone,
                        Notes: row.Notes,
                    })
                })
                .on("end", () => {
                    distributeTasks(items);

                    res.status(200).json({message: "CSV processed", items});
                    fs.unlinkSync(filePath);
                })
                .on("error", (err) => {
                    res.status(400).json({message: "Error parsing CSV", err});
                })
        }
        else if(ext === ".xlsx" || ext === ".xls") {
            const workbook = xlsx.readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

            items = sheetData.map((row) => ({
                FirstName: row.FirstName,
                Phone: row.Phone,
                Notes: row.Notes,
            }));

            distributeTasks(items);

            res.status(200).json({message: "Excel processed!", items});
            fs.unlinkSync(filePath);
        }
        else {
            return res.status(400).json({message: "Unsupported file type!"});
        }
    } catch (error) {
        return res.status(400).json({message: "Failed to upload file!", error});
    }
}

export {
    registerUser,
    loginUser,
    uploadFile,
    getAllAgents,
}