import cors from "cors";
import express from "express";
import diagnosesRouter from "./routes/diagnosesRouter";

const app = express();

/* MIDDLEWARE */

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

/* ROUTES */

app.get("/api/ping", (_req, res) => {
  console.log("ping reached.");
  res.send("pong");
});

app.use("/api/diagnoses", diagnosesRouter);

/* PORT */

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
