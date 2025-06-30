import express, { Request, Response } from 'express';
import Books from '../models/book.model';

export const bookRoutes = express.Router();


// Create Book
bookRoutes.post('/', async (req: Request, res: Response) => {

    try {
        const body = req.body;

        const book = await Books.create(body);

        res.status(200).json({
            success: true,
            message: "Book created successfully",
            data: book
        })
    } catch (error: any) {

        if (error.name === 'ValidationError') res.status(400).json({
            message: 'Validation failed',
            success: false,
            error: error,
        });

        if (error.code === 11000) res.status(400).json({
            message: 'This ISBN already exists',
            success: false,
            error: error.keyValue,
        });


        res.status(500).json({
            message: 'Something went wrong',
            success: false,
            error: error,
        });


    }

});

// Get all books
bookRoutes.get('/', async (req: Request, res: Response) => {
    try {

        const { filter, sortBy = 'createdAt', sort = 'desc', limit = '10' } = req.query;

        let query: any = {};
        if (filter) {
            query.genre = filter;
        }

        const sortByOrder = sort === 'desc' ? -1 : 1;
        const limitNumber = parseInt(limit as string);
        const books = await Books.find(query)
            .sort({ [sortBy as string]: sortByOrder })
            .limit(limitNumber);

        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            books
        })

    } catch (error: any) {
        res.status(500).send({
            message: "Books retrieved failed",
            success: false,
            error: error
        });
    }
});


// Get a book by ID
bookRoutes.get('/:bookId', async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId;

        const book = await Books.findById(bookId);

        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            book
        })

    } catch (error: any) {
        res.status(500).json({
            message: "Book retrieve Failed",
            success: false,
            error: error.message
        })


    }
});


// Update a book information by ID
bookRoutes.put('/:bookId', async (req: Request, res: Response) => {
    try {

        const bookId = req.params.bookId;
        const updatedBody = req.body;

        const book = await Books.findByIdAndUpdate(bookId, updatedBody, { new: true });

        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            book
        })

    } catch (error: any) {
        res.status(500).json({
            message: "Book update Failed",
            success: false,
            error: error.message
        });


    }
});


// Delete a book by ID
bookRoutes.delete('/:bookId', async (req: Request, res: Response) => {

    try {

        const bookId = req.params.bookId;
        const book = await Books.findByIdAndDelete(bookId);

        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: null
        })

    } catch (error: any) {
        res.status(500).json({
            message: "Book deletion Failed",
            success: false,
            error: error.message
        })
    }

})


