import FavoriteIcon from "@mui/icons-material/Favorite";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import { Box, Typography } from "@mui/material";
import {
  HealthCheckEntry as HealthCheckEntryType,
  HealthCheckRating,
} from "../../types";

interface HealthCheckEntryProps {
  entry: HealthCheckEntryType;
}

const HealthCheckEntry = (props: HealthCheckEntryProps) => {
  const { entry } = props;

  let healthCheckIconColor = null;
  switch (entry.healthCheckRating) {
    case HealthCheckRating.Healthy: {
      healthCheckIconColor = "green";
      break;
    }
    case HealthCheckRating.LowRisk: {
      healthCheckIconColor = "lightgreen";
      break;
    }
    case HealthCheckRating.HighRisk: {
      healthCheckIconColor = "yellow";
      break;
    }
    case HealthCheckRating.CriticalRisk: {
      healthCheckIconColor = "orange";
      break;
    }
  }

  return (
    <Box>
      <MedicalInformationIcon />
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Typography>Health Rating: </Typography>
        <FavoriteIcon htmlColor={healthCheckIconColor} />
      </Box>
    </Box>
  );
};

export default HealthCheckEntry;
