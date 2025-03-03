import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { AxiosError } from "axios";
import { SyntheticEvent, useState } from "react";
import { usePatientsContext } from "../../contexts/usePatientsContext";
import patientService from "../../services/patients";
import {
  Discharge,
  Entry,
  EntryWithoutId,
  HealthCheckRating,
  Patient,
  SickLeave,
} from "../../types";
import { assertNever } from "../../utils";
import HealthCheckSubform from "./HealthCheckSubform";
import HospitalSubform from "./HospitalSubform";
import OccupationalHealthcareSubform from "./OccupationalHealthcareSubform";

interface EntryFormProps {
  patient: Patient;
}

/* COMPONENT */

const EntryForm = (props: EntryFormProps) => {
  /* PROPS */
  const { patient } = props;

  /* STATE */
  const [entryType, setEntryType] = useState<
    "HealthCheck" | "Hospital" | "OccupationalHealthcare"
  >("HealthCheck");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState<
    HealthCheckRating | ""
  >("");
  const [discharge, setDischarge] = useState<Discharge>({
    date: "",
    criteria: "",
  });
  const [employerName, setEmployerName] = useState("");
  const [sickLeave, setSickLeave] = useState<SickLeave>({
    startDate: "",
    endDate: "",
  });
  const { patients, setPatients, setNotification } = usePatientsContext();

  /* HANDLERS */

  const handleEntrySubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    const baseEntry = {
      description,
      date,
      specialist,
      diagnosisCodes: diagnosisCodes ? diagnosisCodes.split(", ") : undefined,
    };

    let newEntry: EntryWithoutId | null = null;

    // Depending on the type of entry
    switch (entryType) {
      case "HealthCheck": {
        // Special validation for health check rating
        if (!healthCheckRating) {
          setNotification({
            message: "HealthCheckRating is mandatory",
            severity: "error",
          });
          setTimeout(() => {
            setNotification(null);
          }, 5000);

          return;
        }

        newEntry = {
          ...baseEntry,
          type: "HealthCheck",
          healthCheckRating: healthCheckRating,
        };
        break;
      }
      case "Hospital": {
        newEntry = {
          ...baseEntry,
          type: "Hospital",
          discharge,
        };
        break;
      }
      case "OccupationalHealthcare": {
        newEntry = {
          ...baseEntry,
          type: "OccupationalHealthcare",
          employerName,
          sickLeave,
        };
        break;
      }
      default: {
        assertNever(entryType);
      }
    }

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

      // Set notification
      setNotification({ message: "New entry added.", severity: "success" });
      setTimeout(() => {
        setNotification(null);
      }, 5000);

      // Clear form
      setDescription("");
      setDate("");
      setSpecialist("");
      setDiagnosisCodes("");
      setHealthCheckRating("");
      setDischarge({ date: "", criteria: "" });
      setEmployerName("");
      setSickLeave({ startDate: "", endDate: "" });
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

  let entryTypeSubform = null;

  switch (entryType) {
    case "HealthCheck": {
      entryTypeSubform = (
        <HealthCheckSubform
          healthCheckRating={healthCheckRating}
          setHealthCheckRating={setHealthCheckRating}
        />
      );
      break;
    }
    case "Hospital": {
      entryTypeSubform = (
        <HospitalSubform discharge={discharge} setDischarge={setDischarge} />
      );
      break;
    }
    case "OccupationalHealthcare": {
      entryTypeSubform = (
        <OccupationalHealthcareSubform
          employerName={employerName}
          setEmployerName={setEmployerName}
          sickLeave={sickLeave}
          setSickLeave={setSickLeave}
        />
      );
      break;
    }
    default: {
      assertNever(entryType);
    }
  }

  return (
    <Card
      variant="outlined"
      sx={{
        marginTop: 2.5,
        marginBottom: 2.5,
        minWidth: 650,
        maxWidth: 750,
        borderStyle: "dashed",
      }}
    >
      <CardContent>
        <Typography variant="h5">New HealthCheck Entry</Typography>
        <form onSubmit={handleEntrySubmit}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              marginTop: 2.5,
              marginBottom: 2.5,
            }}
          >
            <TextField
              label="Description"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              type="date"
              label="Date"
              variant="outlined"
              margin="normal"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Specialist"
              variant="outlined"
              value={specialist}
              onChange={(e) => {
                setSpecialist(e.target.value);
              }}
            />
            <TextField
              label="Diagnosis Codes"
              variant="outlined"
              value={diagnosisCodes}
              onChange={(e) => {
                setDiagnosisCodes(e.target.value);
              }}
            />
            <FormControl>
              <FormLabel id="entry-type-group-label">Entry Type</FormLabel>
              <RadioGroup
                row
                aria-labelledby="entry-type-group-label"
                name="entry-type-group"
                value={entryType}
                onChange={(e) => {
                  setEntryType(
                    e.target.value as
                      | "Hospital"
                      | "HealthCheck"
                      | "OccupationalHealthcare"
                  );
                }}
              >
                <FormControlLabel
                  value="HealthCheck"
                  control={<Radio />}
                  label="Health Check"
                />
                <FormControlLabel
                  value="Hospital"
                  control={<Radio />}
                  label="Hospital"
                />
                <FormControlLabel
                  value="OccupationalHealthcare"
                  control={<Radio />}
                  label="Occupational Healthcare"
                />
              </RadioGroup>
            </FormControl>
            {entryTypeSubform}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button type="button" variant="outlined">
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Add Entry
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

export default EntryForm;
