import express, { Request, Response } from 'express';
import cors from 'cors';
import { bookRoutes } from './app/controllers/books.controller';
import { borrowRoutes } from './app/controllers/borrow.controller';

const app = express();

app.use(cors({ origin: ['http://localhost:3000'] }));
app.use(express.json());

app.use('/api/books', bookRoutes);
app.use('/api/borrow', borrowRoutes);

app.get("/", async (req: Request, res: Response) => {
    res.send("Welcome to Library Management");
});


export default app;