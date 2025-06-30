import express from 'express';
import Borrow from '../models/borrow.model';
import { Request, Response } from 'express';


export const borrowRoutes = express.Router();


// Create a borrowed request
borrowRoutes.post("/borrow", async (req: Request, res: Response) => {
    try {

        const body = req.body;
        const borrow = new Borrow(body);

        const data = await borrow.save();

        console.log("data", data);

        res.status(200).send({
            success: true,
            message: "Book borrowed successfully",
            data: data
        });

    } catch (error: any) {
        res.status(500).send({
            message: "Borrowed request failed",
            success: false,
            error: error.message
        })
    }
});


// Get all the borrowed information
borrowRoutes.get("/borrow", async (req: Request, res: Response) => {
    try {
        const borrowedBooksData = await Borrow.aggregate([
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: "$quantity" }
                }
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookInfo"
                }
            },
            {
                $unwind: "$bookInfo"
            },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: "$bookInfo.title",
                        isbn: "$bookInfo.isbn"
                    },
                    totalQuantity: 1
                }
            }
        ]);

        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: borrowedBooksData
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve borrowed books summary",
            error: error.message
        });
    }
});