import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
import { Box, Typography } from "@mui/material";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import diagnosesService from "../../services/diagnoses";
import patientsService from "../../services/patients";
import { Diagnosis, Gender, Patient as PatientType } from "../../types";
import EntryForm from "../EntryForm";
import Entry from "./Entry";

interface PatientProps {
  patients: PatientType[];
  submitNewEntry: (
    newEntry: {
      description: string;
      date: string;
      specialist: string;
      diagnosisCodes: string[];
      healthCheckRating: string;
    },
    patient: PatientType
  ) => void;
}

const Patient = (props: PatientProps) => {
  /* PROPS */
  const { patients, submitNewEntry } = props;

  /* REACT ROUTER */
  const patientId = useParams().id;

  /* STATE */

  const [patient, setPatient] = useState<PatientType | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  /* EFFECTS */

  useEffect(() => {
    const fetchPatient = async (id: string): Promise<void> => {
      try {
        const patient = await patientsService.getPatientById(id);
        setPatient(patient);
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          console.log("Error: ", error.message);
        } else {
          console.log("Unknown error.");
        }
      }
    };

    const fetchDiagnoses = async (): Promise<void> => {
      try {
        const diagnoses = await diagnosesService.getAllDiagnoses();
        setDiagnoses(diagnoses);
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          console.log("Error: ", error.message);
        } else {
          console.log("Unknown error.");
        }
      }
    };

    if (!patientId) {
      return;
    }

    void fetchPatient(patientId);
    void fetchDiagnoses();
  }, [patientId, patients]); // if the user selects another patient, or if the patients state changed, run effect

  /*  VIEW */

  if (!patient) {
    return <div>Loading patient...</div>;
  }

  return (
    <Box style={{ marginTop: "1rem" }}>
      <Typography align="left" variant="h5">
        {patient.name}{" "}
        {patient.gender === Gender.Male ? (
          <MaleIcon />
        ) : patient.gender === Gender.Female ? (
          <FemaleIcon />
        ) : (
          <TransgenderIcon />
        )}
      </Typography>
      <Typography>SSN: {patient.ssn}</Typography>
      <Typography>Occupation: {patient.occupation}</Typography>
      <EntryForm patient={patient} submitNewEntry={submitNewEntry} />
      <Typography align="left" variant="h5">
        Entries
      </Typography>
      {patient.entries.map((e) => {
        return (
          <Box key={e.id}>
            <Entry entry={e} diagnoses={diagnoses} />
          </Box>
        );
      })}
    </Box>
  );
};

export default Patient;
