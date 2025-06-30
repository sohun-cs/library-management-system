import { Model } from "mongoose";


export interface IBooks {
    title: string,
    author: string,
    genre: string,
    isbn: string,
    description: string,
    copies: number,
    available: boolean,
    updateAvailability: () => void;
}


export interface BooksStaticMethods extends Model<IBooks> {
    availableBooks(available: number): number
}
