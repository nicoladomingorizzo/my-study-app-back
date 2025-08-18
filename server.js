// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import tasksRouter from "./routes/tasks.js";
import handleServerError from "./middlewares/handleServerError.js";
import notFoundError from "./middlewares/NotFoundError.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3030;

app.use(express.json());
app.use(cors());

// rotte API
app.use("/api/tasks", tasksRouter);

// rotta di base
app.get("/", (req, res) => {
    res.send("Welcome to my To-do List");
});

// middlewares di errore
app.use(handleServerError);
app.use(notFoundError);

// avvio server
app.listen(PORT, () => {
    console.log(`Server is listening on http://127.0.0.1:${PORT}`);
});
