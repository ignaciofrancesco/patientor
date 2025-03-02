import express, { Response } from "express";
import { z, ZodError, ZodIssue } from "zod";
import patientService from "../services/patientService";
import { Entry, Patient, PatientNonSensitive } from "../types";
import { toNewEntry, toNewPatient } from "../utils";

const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res: Response<PatientNonSensitive[]>) => {
  const patients = patientService.getAllPatientsNonSensitive();
  res.json(patients);
});

patientsRouter.get(
  "/:id",
  (req, res: Response<PatientNonSensitive | { error: string }>) => {
    const patientId = req.params.id;

    try {
      const patient: Patient = patientService.getPatientById(patientId);
      res.json(patient);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(400).json({ error: "unknown error" });
      }
    }
  }
);

patientsRouter.post("/", (req, res) => {
  try {
    // Parses the body to a NewPatient type
    const newPatient = toNewPatient(req.body);

    const addedPatient = patientService.addPatient(newPatient);

    res.json(addedPatient);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: "unknown error" });
    }
  }
});

patientsRouter.post(
  "/:id/entries",
  (req, res: Response<Entry | { errors: Error | ZodIssue[] | string }>) => {
    try {
      // get entry from req
      // parse/validate (diagnosis codes are sent in the correct form)
      const newEntry = toNewEntry(req.body);
      const patientId = req.params.id;

      // save the data
      const entry = patientService.addEntryForPatient(newEntry, patientId);

      // return the new entry as a response
      res.json(entry);
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        res.status(400).json({ errors: error.issues });
      } else if (error instanceof Error) {
        res.status(500).json({ errors: error.message });
      } else {
        res.status(500).json({ errors: "Unknown error." });
      }
    }
  }
);

export default patientsRouter;
