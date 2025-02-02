import express, { Response } from "express";
import diagnoseService from "../services/diagnoseService";
import { Diagnose } from "../types";

const diagnosesRouter = express.Router();

diagnosesRouter.get("/", (_req, res: Response<Diagnose[]>) => {
  console.log("got to diagnoses");

  const diagnoses = diagnoseService.getAllDiagnoses();
  res.json(diagnoses);
});

export default diagnosesRouter;
