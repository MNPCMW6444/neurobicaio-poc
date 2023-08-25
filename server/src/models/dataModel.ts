import mongoose from "mongoose";
const dataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  data: String,
});
export default mongoose.model("DATA", dataSchema);
