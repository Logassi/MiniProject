import express, { Application } from "express";
import eventRoute from "./routes/event.route";

const app: Application = express();

//Middleware function in Express.js that parses incoming JSON payloads and makes the data available in req.body
app.use(express.json());

// app.use("/", homeRoute);

app.use("/event-management", eventRoute);

export default app;
