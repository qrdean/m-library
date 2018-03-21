import { Schema } from "mongoose";

// TODO: Add fields to schema
export var bookSchema: Schema = new Schema({
  createdAt: { type: Date, default: Date.now },
  loc: String,
  isbn: String,
  title: String,
  authorLastName: String,
  authorFirstName: String,
  price: String,
  available: Boolean
  // extra book information
});
