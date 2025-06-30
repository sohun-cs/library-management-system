import { model, Schema } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";
import { IBooks } from "../interfaces/books.interface";
import Books from "./book.model";


const borrowSchema = new Schema<IBorrow>({
    book: { type: Schema.ObjectId, required: true },
    quantity: { type: Number, min: 0, required: true },
    dueDate: {
        type: Date, required: true, validate: {
            validator: function (value) {
                return value > new Date
            },
            message: "Due date must be future"
        }
    }
});


// Book copies and borrowed quantities adjustment
borrowSchema.pre("save", async function (next) {
    const book = await Books.findById(this.book)

    if (!book) return next(new Error("Book is not found"));

    if (book.copies < this.quantity) {
        return next(new Error("Insufficient copies are available"));
    };

    book.copies -= this.quantity;
    await book.save();

    next();

});

const Borrow = model<IBorrow>("Borrow", borrowSchema);

export default Borrow;