import express, { Response } from "express";
import patientService from "../services/patientService";
import { PatientNonSensitive } from "../types";

const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res: Response<PatientNonSensitive[]>) => {
  const patients = patientService.getAllPatientsNonSensitive();
  res.json(patients);
});

export default patientsRouter;
