"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const dataModel_1 = __importDefault(require("./models/dataModel"));
const app = (0, express_1.default)();
const port = process.env.PORT || 6555;
dotenv_1.default.config();
let mainDbStatus = false;
const connectToDB = () => {
    mongoose_1.default.set("strictQuery", false);
    mongoose_1.default.connect("" + process.env.SAFE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, (err) => {
        if (err)
            return console.error(err);
        console.log("Connected to Main MongoDB");
        mainDbStatus = true;
    });
    if (!mainDbStatus)
        setTimeout(connectToDB, 180000);
};
connectToDB();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ["http://localhost:5665", "https://poc.neurobicare.com"],
    credentials: true,
}));
app.get("/areyoualive", (_, res) => res.json({ answer: "yes" }));
app.post("/write", async (req, res) => {
    try {
        const { score } = req.body;
        const scoreModel = new dataModel_1.default({
            score
        });
        await scoreModel.save();
        return res.json({ answer: "score saved!" });
    }
    catch (e) {
        console.log(e);
        return res.json({ error: JSON.stringify(e) });
    }
});
app.listen(port, () => console.log(`Server started on port: ${port}`));
