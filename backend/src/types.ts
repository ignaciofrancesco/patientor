type Diagnose = {
  code: string;
  name: string;
  latin?: string;
};

type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
};

type NewPatient = Omit<Patient, "id">;

type PatientNonSensitive = Omit<Patient, "ssn">;

enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export { Diagnose, Gender, NewPatient, Patient, PatientNonSensitive };
