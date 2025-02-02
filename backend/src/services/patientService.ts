import patients from "../../data/patients";
import { Patient, PatientNonSensitive } from "../types";

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

export default { getAllPatients, getAllPatientsNonSensitive };
