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
  gender: string;
  occupation: string;
};

type PatientNonSensitive = Omit<Patient, "ssn">;

export { Diagnose, Patient, PatientNonSensitive };
