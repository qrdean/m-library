import mongoose = require("mongoose");
import { Document, Model } from "mongoose";
import { Book as BookInterface } from "../interfaces/book";
import { bookSchema } from "./../schemas/book";

export interface BookModel extends BookInterface, Document {}

export interface BookModelStatic extends Model<BookModel> {}

export const Book = mongoose.model<BookModel, BookModelStatic>(
  "Book",
  bookSchema
);
