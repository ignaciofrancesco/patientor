import { v1 as uuid } from "uuid";
import patients from "../../data/patients";
import {
  Entry,
  EntryWithoutId,
  NewPatient,
  Patient,
  PatientNonSensitive,
} from "../types";

const getAllPatients = (): Patient[] => {
  return patients;
};

const getAllPatientsNonSensitive = (): PatientNonSensitive[] => {
  return patients.map((p) => {
    return {
      dateOfBirth: p.dateOfBirth,
      gender: p.gender,
      id: p.id,
      name: p.name,
      occupation: p.occupation,
    };
  });
};

const getPatientById = (id: string): Patient => {
  const patient = patients.find((p) => p.id === id);

  if (!patient) {
    throw new Error("Patient not found.");
  }

  return patient;
};

const addPatient = (newPatient: NewPatient): Patient => {
  // Create and add id
  const id = uuid();
  const patient = { id, ...newPatient };

  // Add new patient to the patients list
  patients.push(patient);

  return patient;
};

const addEntryForPatient = (
  newEntry: EntryWithoutId,
  patientId: string
): Entry => {
  // Create id for entry
  const entryId = uuid();

  // Find the patient
  const patient = patients.find((p) => p.id === patientId);

  if (!patient) {
    throw new Error("Patient not found.");
  }

  const entry: Entry = { id: entryId, ...newEntry };

  // Add the new entry to its entries
  patient.entries.push(entry);

  return entry;
};

export default {
  getAllPatients,
  getAllPatientsNonSensitive,
  addPatient,
  getPatientById,
  addEntryForPatient,
};
