import {
  Button,
  Container,
  CssBaseline,
  Divider,
  Typography,
} from "@mui/material";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";

import { apiBaseUrl } from "./constants";

import PatientListPage from "./components/PatientListPage";
import Patient from "./components/PatientPage/Patient";
import patientService from "./services/patients";
import { Entry, Patient as PatientType } from "./types";

import NotificationComponent from "./components/NotificationComponent";
import { Notification as NotificationType } from "./types";

const App = () => {
  /* STATE */
  const [patients, setPatients] = useState<PatientType[]>([]);
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );

  /* EFECTS  */

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);

  /* REACT ROUTER */

  // const match = useMatch("/patients/:id");
  // const patient = match ? patients.find((p) => p.id === match.params.id) : null;

  /* HANDLERS */

  const submitNewEntry = async (
    newEntry: {
      description: string;
      date: string;
      specialist: string;
      diagnosisCodes: string[];
      healthCheckRating: string;
    },
    patient: PatientType
  ) => {
    try {
      // create the new entry
      const entry: Entry = await patientService.createEntryForPatient(
        newEntry,
        patient
      );

      // Add the new entry to entries
      const entriesModified = [...patient.entries, entry];
      // Add the modified entries to patient
      const modifiedPatient = { ...patient, entries: entriesModified };
      // Create new state for patients
      const newPatients = patients.map((p) => {
        return p.id === patient.id ? modifiedPatient : p;
      });
      // Set new state of the app
      setPatients(newPatients);

      setNotification({ message: "New entry added.", severity: "success" });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (error: unknown) {
      let notificationMessage = "Errors: ";

      if (error instanceof AxiosError) {
        notificationMessage += error.response?.data.errors
          .map((e: { code: string; message: string }) => {
            return e.message;
          })
          .join(" | ");
      }

      setNotification({
        message: notificationMessage,
        severity: "error",
      });

      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  /* VIEW */

  return (
    <>
      {/* Reset css */}
      <CssBaseline />
      <div className="App">
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider sx={{ marginBottom: 3, marginTop: 3 }} />
          <NotificationComponent notification={notification} />
          <Routes>
            <Route
              path="/"
              element={
                <PatientListPage
                  patients={patients}
                  setPatients={setPatients}
                />
              }
            />
            <Route
              path="/patients/:id"
              element={
                <Patient patients={patients} submitNewEntry={submitNewEntry} />
              }
            />
          </Routes>
        </Container>
      </div>
    </>
  );
};

export default App;
