import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { Box, Typography } from "@mui/material";
import { HospitalEntry as HospitalEntryType } from "../../types";

interface HospitalEntryProps {
  entry: HospitalEntryType;
}

const HospitalEntry = (props: HospitalEntryProps) => {
  const { entry } = props;

  return (
    <Box>
      <LocalHospitalIcon />
      <Typography>
        Discharge on {entry.discharge.date}: {entry.discharge.criteria}
      </Typography>
    </Box>
  );
};

export default HospitalEntry;
