import axios from "axios";
import { Entry, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const getPatientById = async (id: string): Promise<Patient> => {
  const response = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  const patient = response.data;
  return patient;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const createEntryForPatient = async (object: unknown, patient: Patient) => {
  const response = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${patient.id}/entries`,
    object
  );

  const entry = response.data;

  return entry;
};

export default {
  getAll,
  create,
  getPatientById,
  createEntryForPatient,
};
