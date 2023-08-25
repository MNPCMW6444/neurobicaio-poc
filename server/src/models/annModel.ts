import mongoose from "mongoose";
const annSchema = new mongoose.Schema({
  network: Object,
});
export default mongoose.model("ANN", annSchema);
