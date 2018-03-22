import { Schema } from "mongoose";

// TODO: Add fields to schema
export var bookSchema: Schema = new Schema({
  createdAt: { type: Date, default: Date.now },
  lccn: String,
  isbn: String,
  title: String,
  author: String,
  publish_date: String,
  available: Boolean
  // extra book information
});
