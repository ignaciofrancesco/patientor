import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { HealthCheckRating } from "../../types";

interface HealthCheckSubformProps {
  healthCheckRating: HealthCheckRating | "";
  setHealthCheckRating: (healthCheckRating: HealthCheckRating) => void;
}

const HealthCheckSubform = (props: HealthCheckSubformProps) => {
  /* PROPS */
  const { healthCheckRating, setHealthCheckRating } = props;

  return (
    <FormControl>
      <InputLabel id="health-check-rating-label">
        Health Check Rating
      </InputLabel>
      <Select
        value={healthCheckRating}
        label="Health Check Rating"
        onChange={(e) =>
          setHealthCheckRating(e.target.value as HealthCheckRating)
        }
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
  );
};

export default HealthCheckSubform;
