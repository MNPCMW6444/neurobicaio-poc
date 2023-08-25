import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({

    score: Number,
});
export default mongoose.model("DATA", dataSchema);
