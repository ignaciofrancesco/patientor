import { FormControl, FormGroup, FormLabel, TextField } from "@mui/material";
import { Discharge } from "../../types";

interface HospitalSubformProps {
  discharge: Discharge;
  setDischarge: (discharge: Discharge) => void;
}

const HospitalSubform = (props: HospitalSubformProps) => {
  /* PROPS */
  const { discharge, setDischarge } = props;

  return (
    <FormControl
      component="fieldset"
      sx={{ p: 2, border: "1px solid gray", borderRadius: 2 }}
    >
      <FormLabel component="legend">Discharge</FormLabel>
      <FormGroup>
        <TextField
          type="date"
          label="Date"
          variant="outlined"
          margin="normal"
          fullWidth
          value={discharge.date}
          onChange={(e) => {
            setDischarge({ ...discharge, date: e.target.value });
          }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Criteria"
          type="text"
          variant="outlined"
          margin="normal"
          fullWidth
          value={discharge.criteria}
          onChange={(e) =>
            setDischarge({ ...discharge, criteria: e.target.value })
          }
        />
      </FormGroup>
    </FormControl>
  );
};

export default HospitalSubform;
