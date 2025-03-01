import {
  Button,
  Container,
  CssBaseline,
  Divider,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";

import { apiBaseUrl } from "./constants";
import { Patient as PatientType } from "./types";

import PatientListPage from "./components/PatientListPage";
import Patient from "./components/PatientPage/Patient";
import patientService from "./services/patients";

const App = () => {
  /* STATE */

  const [patients, setPatients] = useState<PatientType[]>([]);

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
          <Divider hidden />
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
            <Route path="/patients/:id" element={<Patient />} />
          </Routes>
        </Container>
      </div>
    </>
  );
};

export default App;
