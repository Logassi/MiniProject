import express, { Application } from "express";
import eventRoute from "./routes/event.route";
import ErrorMiddleware from "./middlewares/error.middleware";

const app: Application = express();

//Middleware function in Express.js that parses incoming JSON payloads and makes the data available in req.body
app.use(express.json());

// app.use("/", homeRoute);

app.use("/event-management", eventRoute);

app.use(ErrorMiddleware);

export default app;
