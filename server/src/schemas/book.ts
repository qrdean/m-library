import { Schema } from "mongoose";

// TODO: Add fields to schema
export var bookSchema: Schema = new Schema({
  createdAt: { type: Date, default: Date.now },
  name: String
  // extra book information
});
