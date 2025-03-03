import {
  Box,
  FormControl,
  FormGroup,
  FormLabel,
  TextField,
} from "@mui/material";
import { SickLeave } from "../../types";

interface OccupationalHealthcareSubformProps {
  employerName: string;
  sickLeave: SickLeave;
  setEmployerName: (employerName: string) => void;
  setSickLeave: (sickLeave: SickLeave) => void;
}
const OccupationalHealthcareSubform = (
  props: OccupationalHealthcareSubformProps
) => {
  const { employerName, sickLeave, setEmployerName, setSickLeave } = props;

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <TextField
        label="Employer Name"
        value={employerName}
        onChange={(e) => {
          setEmployerName(e.target.value);
        }}
      />
      <FormControl
        component="fieldset"
        sx={{ p: 2, border: "1px solid gray", borderRadius: 2, marginTop: 2 }}
      >
        <FormLabel component="legend">Sick Leave</FormLabel>
        <FormGroup>
          <TextField
            type="date"
            label="Start Date"
            variant="outlined"
            margin="normal"
            value={sickLeave.startDate}
            onChange={(e) => {
              setSickLeave({ ...sickLeave, startDate: e.target.value });
            }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            type="date"
            label="End Date"
            variant="outlined"
            margin="normal"
            value={sickLeave.endDate}
            onChange={(e) => {
              setSickLeave({ ...sickLeave, endDate: e.target.value });
            }}
            InputLabelProps={{ shrink: true }}
          />
        </FormGroup>
      </FormControl>
    </Box>
  );
};

export default OccupationalHealthcareSubform;
