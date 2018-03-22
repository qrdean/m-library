import { Schema } from "mongoose";

// TODO: Add fields to schema
export var userSchema: Schema = new Schema({
  createdAt: { type: Date, default: Date.now },
  lastname: String,
  firstname: String,
  password: String,
  username: String
  // extra user data
});
