import express, { Response } from "express";
import patientService from "../services/patientService";
import { PatientNonSensitive } from "../types";
import { toNewPatient } from "../utils";

const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res: Response<PatientNonSensitive[]>) => {
  const patients = patientService.getAllPatientsNonSensitive();
  res.json(patients);
});

patientsRouter.post("/", (req, res) => {
  try {
    // Parses the body to a NewPatient type
    const newPatient = toNewPatient(req.body);

    const addedPatient = patientService.addPatient(newPatient);

    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default patientsRouter;
