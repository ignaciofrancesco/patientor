import WorkIcon from "@mui/icons-material/Work";
import { Box } from "@mui/system";
import { OccupationalHealthcareEntry as OccupationalHealthcareEntryType } from "../../types";
import { Typography } from "@mui/material";

interface OccupationalHealthcareEntryProps {
  entry: OccupationalHealthcareEntryType;
}

const OccupationalHealthcareEntry = (
  props: OccupationalHealthcareEntryProps
) => {
  const { entry } = props;
  return (
    <Box>
      <WorkIcon />
      <Typography>Employer: {entry.employerName}</Typography>
      {entry.sickLeave && (
        <Typography>
          Sick leave from {entry.sickLeave.startDate} till
          {entry.sickLeave.endDate}
        </Typography>
      )}
    </Box>
  );
};

export default OccupationalHealthcareEntry;
