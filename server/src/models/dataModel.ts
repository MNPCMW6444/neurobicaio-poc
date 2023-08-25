import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({

    data: String,
});
export default mongoose.model("DATA", dataSchema);
