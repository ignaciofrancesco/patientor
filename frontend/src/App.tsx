import {
  Button,
  Container,
  CssBaseline,
  Divider,
  Typography,
} from "@mui/material";
import { Link, Route, Routes } from "react-router-dom";

import PatientListPage from "./components/PatientListPage";
import Patient from "./components/PatientPage/Patient";

import NotificationComponent from "./components/NotificationComponent";

const App = () => {
  /* STATE */

  /* EFECTS  */

  /* HANDLERS */

  /* VIEW */

  return (
    <>
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
          <NotificationComponent />
          <Routes>
            <Route path="/" element={<PatientListPage />} />
            <Route path="/patients/:id" element={<Patient />} />
          </Routes>
        </Container>
      </div>
    </>
  );
};

export default App;
