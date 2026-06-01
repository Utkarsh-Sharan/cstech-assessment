import bcrypt from "bcrypt";
import { Agent } from "../models/agent.model.js";

const createAgent = async (req, res) => {
    try {
        const {name, email, phone, password} = req.body;

        const agentAlreadyExists = await Agent.findOne({ $or: [ {email}, {phone} ] });

        if(agentAlreadyExists) 
            return res.status(409).json({message: "Agent already exists!"});
    
        const hashedPassword = await bcrypt.hash(password, 10);

        const agent = await Agent.create({
            name,
            email,
            phone,
            password: hashedPassword,
        });

        return res.status(201).json({
            message: "Agent created successfully!",
            agent: {
                id: agent._id,
                name: agent.name,
                email: agent.email,
                phone: agent.phone,
            }
        });
    } catch (error) {
        return res.status(400).json({message: "Failed to create agent!"}, error);
    }
}

export {
    createAgent,
}