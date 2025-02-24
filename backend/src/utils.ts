import { z } from "zod";
import { Gender, NewPatient } from "./types";

const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  entries: z.array(z.object({})), // this should be an Entry
});

const toNewPatient = (object: unknown): NewPatient => {
  // Uses Zod to validate and parse the object
  const newPatient = newPatientSchema.parse(object);
  return newPatient;
};

export { toNewPatient };
