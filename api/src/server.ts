import express, { Application } from "express";
import eventRoute from "./routes/event.route";
import ErrorMiddleware from "./middlewares/error.middleware";
import cors from "cors";
import { BASE_WEB_URL } from "./utils/envConfig";

const app: Application = express();

app.use(
  cors({
    origin: BASE_WEB_URL || "http://localhost:3000",
    credentials: true,
  })
);

//Middleware function in Express.js that parses incoming JSON payloads and makes the data available in req.body
app.use(express.json());

// app.use("/", homeRoute);

app.use("/event-management", eventRoute);

app.use(ErrorMiddleware);

export default app;
