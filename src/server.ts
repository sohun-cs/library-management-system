import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";
require("dotenv").config();

let server: Server;

async function main() {
    try {
        await mongoose.connect(`${process.env.DB_CONN}`);
        console.log("Connected to MongoDB");

        server = app.listen(process.env.DB_PORT, () => {
            console.log(`Server is running on port ${process.env.DB_PORT}`);
        });
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
}

main();
