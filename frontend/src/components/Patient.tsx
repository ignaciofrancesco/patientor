import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
import { Box, Typography } from "@mui/material";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientsService from "../services/patients";
import { Gender, Patient as PatientType } from "../types";

const Patient = () => {
  /* REACT ROUTER */
  const patientId = useParams().id;

  /* STATE */

  const [patient, setPatient] = useState<PatientType | null>(null);

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

    if (!patientId) {
      return;
    }

    void fetchPatient(patientId);
  }, [patientId]);

  if (!patient) {
    return <div>Loading patient...</div>;
  }

  return (
    <Box style={{ marginTop: "1rem" }}>
      <Typography align="left" variant="h6">
        {patient.name}{" "}
        {patient.gender === Gender.Male ? (
          <MaleIcon />
        ) : patient.gender === Gender.Female ? (
          <FemaleIcon />
        ) : (
          <TransgenderIcon />
        )}
      </Typography>
      <p>SSN: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
    </Box>
  );
};

export default Patient;
