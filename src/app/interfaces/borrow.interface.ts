import { ObjectId } from 'mongodb'

export interface IBorrow {
    book: ObjectId,
    quantity: number,
    dueDate: Date

};
