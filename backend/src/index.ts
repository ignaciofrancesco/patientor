import cors from "cors";
import express from "express";
import diagnosesRouter from "./routes/diagnosesRouter";
import patientsRouter from "./routes/patientsRouter";

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
app.use("/api/patients", patientsRouter);

/* PORT */

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
