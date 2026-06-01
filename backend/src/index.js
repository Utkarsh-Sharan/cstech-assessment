import dotenv from "dotenv";
dotenv.config({
    path: "./.env",
});

import connectDB from "./db/index.js";
import app from "./app.js";

const port = process.env.PORT;

connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`App is listening on port: ${port}`);
        })
    })
    .catch((error) => {
        console.log("Failed to connect to MongoDB", error);
    });