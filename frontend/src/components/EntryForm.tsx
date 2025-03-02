import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { HealthCheckRating, Patient } from "../types";

interface EntryFormProps {
  patient: Patient;
  submitNewEntry: (
    newEntry: {
      description: string;
      date: string;
      specialist: string;
      diagnosisCodes: string[];
      healthCheckRating: string;
    },
    patient: Patient
  ) => void;
}

const EntryForm = (props: EntryFormProps) => {
  /* PROPS */
  const { patient, submitNewEntry } = props;

  /* STATE */
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState("");

  /* HANDLERS */

  const handleEntrySubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    // Create the new entry object
    const newEntry = {
      type: "HealthCheck",
      description,
      date,
      specialist,
      diagnosisCodes: diagnosisCodes.split(", "),
      healthCheckRating,
    };

    // Clear form
    setDescription("");
    setDate("");
    setSpecialist("");
    setDiagnosisCodes("");
    setHealthCheckRating("");

    // Call the handler prop
    submitNewEntry(newEntry, patient);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        marginTop: 2.5,
        marginBottom: 2.5,
        minWidth: 270,
        maxWidth: 500,
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
              label="Date"
              variant="outlined"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
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

            <FormControl fullWidth>
              <InputLabel id="health-check-rating-label">
                Health Check Rating
              </InputLabel>
              <Select
                value={healthCheckRating}
                label="Health Check Rating"
                onChange={(e) => setHealthCheckRating(e.target.value)}
              >
                {Object.values(HealthCheckRating)
                  .filter((hcr) => typeof hcr === "number")
                  .map((value) => {
                    return (
                      <MenuItem key={value} value={value}>
                        {HealthCheckRating[value]}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
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
