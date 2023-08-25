"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const brain_js_1 = require("brain.js");
const dataModel_1 = __importDefault(require("./models/dataModel"));
const annModel_1 = __importDefault(require("./models/annModel"));
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
app.post("/train", async (req, res) => {
    try {
        const { input, output, name } = req.body;
        const datatokeep = new dataModel_1.default({
            data: JSON.stringify({ input, output }),
            name,
        });
        await datatokeep.save();
        const lastAnn = await annModel_1.default.findOne().sort({ createdAt: -1 }).exec();
        if (!lastAnn) {
            const net = new brain_js_1.NeuralNetwork({
                inputSize: 32,
                outputSize: 1,
                hiddenLayers: [10, 10],
            });
            let o = {};
            o[output] = 1;
            net.train([
                {
                    input: {
                        feature00: input.original.data[0],
                        feature01: input.original.data[1],
                        feature02: input.original.data[2],
                        feature03: input.original.data[3],
                        feature04: input.proccesed.THETA[0],
                        feature05: input.proccesed.THETA[1],
                        feature06: input.proccesed.THETA[2],
                        feature07: input.proccesed.THETA[3],
                        feature08: input.proccesed.ALPHA_LOW[0],
                        feature09: input.proccesed.ALPHA_LOW[1],
                        feature10: input.proccesed.ALPHA_LOW[2],
                        feature11: input.proccesed.ALPHA_LOW[3],
                        feature12: input.proccesed.ALPHA_HIGH[0],
                        feature13: input.proccesed.ALPHA_HIGH[1],
                        feature14: input.proccesed.ALPHA_HIGH[2],
                        feature15: input.proccesed.ALPHA_HIGH[3],
                        feature16: input.proccesed.BETA_LOW[0],
                        feature17: input.proccesed.BETA_LOW[1],
                        feature18: input.proccesed.BETA_LOW[2],
                        feature19: input.proccesed.BETA_LOW[3],
                        feature20: input.proccesed.BETA_MID[0],
                        feature21: input.proccesed.BETA_MID[1],
                        feature22: input.proccesed.BETA_MID[2],
                        feature23: input.proccesed.BETA_MID[3],
                        feature24: input.proccesed.BETA_HIGH[0],
                        feature25: input.proccesed.BETA_HIGH[1],
                        feature26: input.proccesed.BETA_HIGH[2],
                        feature27: input.proccesed.BETA_HIGH[3],
                        feature28: input.proccesed.GAMMA[0],
                        feature29: input.proccesed.GAMMA[1],
                        feature30: input.proccesed.GAMMA[2],
                        feature31: input.proccesed.GAMMA[3],
                    },
                    output: { focused: o, distracted: 100 - 0 },
                },
            ]);
            const ann = new annModel_1.default({
                network: net.toJSON(),
            });
            await ann.save();
            return res.json({ answer: "ANN trained and saved!" });
        }
        const net = new brain_js_1.NeuralNetwork().fromJSON(lastAnn.network);
        let o = {};
        o[output] = 1;
        net.train([
            {
                input: {
                    feature00: input.original.data[0],
                    feature01: input.original.data[1],
                    feature02: input.original.data[2],
                    feature03: input.original.data[3],
                    feature04: input.proccesed.THETA[0],
                    feature05: input.proccesed.THETA[1],
                    feature06: input.proccesed.THETA[2],
                    feature07: input.proccesed.THETA[3],
                    feature08: input.proccesed.ALPHA_LOW[0],
                    feature09: input.proccesed.ALPHA_LOW[1],
                    feature10: input.proccesed.ALPHA_LOW[2],
                    feature11: input.proccesed.ALPHA_LOW[3],
                    feature12: input.proccesed.ALPHA_HIGH[0],
                    feature13: input.proccesed.ALPHA_HIGH[1],
                    feature14: input.proccesed.ALPHA_HIGH[2],
                    feature15: input.proccesed.ALPHA_HIGH[3],
                    feature16: input.proccesed.BETA_LOW[0],
                    feature17: input.proccesed.BETA_LOW[1],
                    feature18: input.proccesed.BETA_LOW[2],
                    feature19: input.proccesed.BETA_LOW[3],
                    feature20: input.proccesed.BETA_MID[0],
                    feature21: input.proccesed.BETA_MID[1],
                    feature22: input.proccesed.BETA_MID[2],
                    feature23: input.proccesed.BETA_MID[3],
                    feature24: input.proccesed.BETA_HIGH[0],
                    feature25: input.proccesed.BETA_HIGH[1],
                    feature26: input.proccesed.BETA_HIGH[2],
                    feature27: input.proccesed.BETA_HIGH[3],
                    feature28: input.proccesed.GAMMA[0],
                    feature29: input.proccesed.GAMMA[1],
                    feature30: input.proccesed.GAMMA[2],
                    feature31: input.proccesed.GAMMA[3],
                },
                output: { focused: o, distracted: 100 - 0 },
            },
        ]);
        lastAnn.network = net.toJSON();
        await lastAnn.save();
        return res.json({ answer: "ANN updated!" });
    }
    catch (e) {
        console.log(e);
        return res.json({ error: JSON.stringify(e) });
    }
});
app.post("/read", async (req, res) => {
    try {
        const { input } = req.body;
        const lastAnn = await annModel_1.default.findOne().sort({ createdAt: -1 }).exec();
        if (!lastAnn) {
            return res.json({ error: "no network" });
        }
        const net = new brain_js_1.NeuralNetwork().fromJSON(lastAnn.network);
        const output = net.run({
            feature00: input.original.data[0],
            feature01: input.original.data[1],
            feature02: input.original.data[2],
            feature03: input.original.data[3],
            feature04: input.proccesed.THETA[0],
            feature05: input.proccesed.THETA[1],
            feature06: input.proccesed.THETA[2],
            feature07: input.proccesed.THETA[3],
            feature08: input.proccesed.ALPHA_LOW[0],
            feature09: input.proccesed.ALPHA_LOW[1],
            feature10: input.proccesed.ALPHA_LOW[2],
            feature11: input.proccesed.ALPHA_LOW[3],
            feature12: input.proccesed.ALPHA_HIGH[0],
            feature13: input.proccesed.ALPHA_HIGH[1],
            feature14: input.proccesed.ALPHA_HIGH[2],
            feature15: input.proccesed.ALPHA_HIGH[3],
            feature16: input.proccesed.BETA_LOW[0],
            feature17: input.proccesed.BETA_LOW[1],
            feature18: input.proccesed.BETA_LOW[2],
            feature19: input.proccesed.BETA_LOW[3],
            feature20: input.proccesed.BETA_MID[0],
            feature21: input.proccesed.BETA_MID[1],
            feature22: input.proccesed.BETA_MID[2],
            feature23: input.proccesed.BETA_MID[3],
            feature24: input.proccesed.BETA_HIGH[0],
            feature25: input.proccesed.BETA_HIGH[1],
            feature26: input.proccesed.BETA_HIGH[2],
            feature27: input.proccesed.BETA_HIGH[3],
            feature28: input.proccesed.GAMMA[0],
            feature29: input.proccesed.GAMMA[1],
            feature30: input.proccesed.GAMMA[2],
            feature31: input.proccesed.GAMMA[3],
        });
        return res.json({ answer: output });
    }
    catch (e) {
        console.log(e);
        return res.json({ error: JSON.stringify(e) });
    }
});
app.listen(port, () => console.log(`Server started on port: ${port}`));
