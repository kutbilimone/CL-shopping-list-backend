import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import productsRoute from "./routes/product.route";
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/test", productsRoute);
app.use("/products", productsRoute);
app.get("/", (req, res) => res.status(404).send("Path not found"));

export { app };
