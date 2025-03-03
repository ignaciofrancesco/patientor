import { z } from "zod";
import { EntryWithoutId, Gender, NewPatient } from "./types";

// BaseEntry Schema
const BaseEntrySchema = z.object({
  id: z.string(),
  description: z
    .string()
    .trim()
    .min(1, { message: "Description cannot be empty" }),
  date: z.string().date("Date should have format yyyy-mm-dd"),
  specialist: z
    .string()
    .trim()
    .min(1, { message: "Specialist cannot be empty" }),
  diagnosisCodes: z.array(z.string()).optional(),
});

// HealthCheckRating Enum
const HealthCheckRatingSchema = z.nativeEnum({
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
});

// HealthCheckEntry Schema
const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: HealthCheckRatingSchema,
});

// SickLeave Schema
const SickLeaveSchema = z.object({
  startDate: z.string().date("The start date should be a valid date."),
  endDate: z.string().date("The end date should be a valid date."),
});

// OccupationalHealthcareEntry Schema
const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z
    .string()
    .trim()
    .min(1, { message: "Employer name cannot be empty" }),
  sickLeave: SickLeaveSchema.optional(),
});

// Discharge Schema
const DischargeSchema = z.object({
  date: z.string().date("Date should have format yyyy-mm-dd"),
  criteria: z.string().trim().min(1, { message: "Criteria cannot be empty" }),
});

// HospitalEntry Schema
const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: DischargeSchema,
});

// Entry Union Schema
const EntrySchema = z.discriminatedUnion("type", [
  HealthCheckEntrySchema,
  OccupationalHealthcareEntrySchema,
  HospitalEntrySchema,
]);

// Entry schema without id
const EntrySchemaWithoutId = z.discriminatedUnion("type", [
  HealthCheckEntrySchema.omit({ id: true }).strict(),
  OccupationalHealthcareEntrySchema.omit({ id: true }).strict(),
  HospitalEntrySchema.omit({ id: true }).strict(),
]); // I use strict to enforce no extra attributes

const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  entries: z.array(EntrySchema), // this should be an Entry
});

const toNewPatient = (object: unknown): NewPatient => {
  // Uses Zod to validate and parse the object
  const newPatient = NewPatientSchema.parse(object);
  return newPatient;
};

const toNewEntry = (object: unknown): EntryWithoutId => {
  const newEntry = EntrySchemaWithoutId.parse(object);
  return newEntry;
};

export { toNewEntry, toNewPatient };
