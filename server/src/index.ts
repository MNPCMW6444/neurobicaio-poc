import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose, {ConnectOptions} from "mongoose";
import {NeuralNetwork} from "brain.js";
import DATA from "./models/dataModel";
import ANN from "./models/annModel";

const app = express();
const port = process.env.PORT || 6555;

dotenv.config();

let mainDbStatus = false;

const connectToDB = () => {
    mongoose.set("strictQuery", false);
    mongoose.connect(
        "" + process.env.SAFE,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions,
        (err) => {
            if (err) return console.error(err);
            console.log("Connected to Main MongoDB");
            mainDbStatus = true;
        }
    );

    if (!mainDbStatus) setTimeout(connectToDB, 180000);
};

connectToDB();

app.use(express.json());

app.use(
    cors({
        origin: ["http://localhost:5665", "https://poc.neurobicare.com", "https://muse-integration.netlify.app"],
        credentials: true,
    })
);

app.get("/areyoualive", (_, res) => res.json({answer: "yes"}));

app.post("/write", async (req, res) => {
    try {
        const {score} = req.body;

        const scoreModel = new DATA({
            score
        });

        await scoreModel.save();


        return res.json({answer: "score saved!"});

    } catch (e) {
        console.log(e);
        return res.json({error: JSON.stringify(e)});
    }
});

app.listen(port, () => console.log(`Server started on port: ${port}`));
