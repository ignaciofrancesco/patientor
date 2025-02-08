import { v1 as uuid } from "uuid";
import patients from "../../data/patients";
import { NewPatient, Patient, PatientNonSensitive } from "../types";

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

const addPatient = (newPatient: NewPatient): Patient => {
  console.log(newPatient);

  // Create and add id
  const id = uuid();
  const patient = { id, ...newPatient };

  // Add new patient to the patients list
  patients.push(patient);

  return patient;
};

export default { getAllPatients, getAllPatientsNonSensitive, addPatient };
