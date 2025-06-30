import { model, Schema } from "mongoose";
import { BooksStaticMethods, IBooks } from "../interfaces/books.interface";


const bookSchema = new Schema<IBooks, BooksStaticMethods>({

    title: {
        type: String, trim: true, required: true,
        validate: {
            validator: function (value) {
                return typeof value === 'string';
            },
            message: "Title must be a string"
        },
        cast: false
    },
    author: { type: String, trim: true, required: true },
    genre: {
        type: String,
        enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'],
        trim: true,
        required: true
    },
    isbn: { type: String, unique: [true, "ISBN already exists"], required: true, trim: true },
    description: { type: String, trim: true },
    copies: { type: Number, min: [0, "Copies must be a positive number"], required: true },
    available: { type: Boolean, default: true }

},
    {
        versionKey: false,
        timestamps: true
    }
);


// Book availabilities are managing from here
bookSchema.methods.updateAvailability = function () {
    this.available = this.copies > 0;
};


bookSchema.pre('save', function (next) {
    if (this.copies === 0) {
        this.available = false;
    } else {
        this.available = true;
    }
    next();
});

bookSchema.methods.updateAvailability = function () {
    if (this.copies === 0) {
        this.available = false;
    } else {
        this.available = true;
    }
    return this.save();
};


const Books = model<IBooks, BooksStaticMethods>("Books", bookSchema);

export default Books;