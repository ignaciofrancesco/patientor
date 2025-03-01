import { z } from "zod";
import { EntryWithoutId, Gender, NewPatient } from "./types";

// BaseEntry Schema
const BaseEntrySchema = z.object({
  id: z.string(),
  description: z.string(),
  date: z.string(),
  specialist: z.string(),
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
  startDate: z.string(),
  endDate: z.string(),
});

// OccupationalHealthcareEntry Schema
const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: SickLeaveSchema.optional(),
});

// Discharge Schema
const DischargeSchema = z.object({
  date: z.string(),
  criteria: z.string(),
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
