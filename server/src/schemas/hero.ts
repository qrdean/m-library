import { Schema } from "mongoose";

// FIXME: TUTORIAL CODE. REPLACE WITH YOUR OWN
export var heroSchema: Schema = new Schema({
    createdAt: { type: Date, default: Date.now },
    name: String
});