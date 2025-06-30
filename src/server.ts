import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";
require("dotenv").config();

let server: Server;


async function main() {

    try {

        server = app.listen(process.env.DB_PORT, async () => {
            await mongoose.connect(`${process.env.DB_CONN}`);
            console.log(`Server is running on ${process.env.DB_PORT}`)
        })

    } catch (error) {
        console.error(error)
    }

}

main();