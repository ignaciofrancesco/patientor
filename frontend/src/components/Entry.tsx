import { Box } from "@mui/material";
import { Diagnosis, Entry as EntryType } from "../types";

interface EntryProps {
  entry: EntryType;
  diagnoses: Diagnosis[];
}

const Entry = (props: EntryProps) => {
  const { entry, diagnoses } = props;
  return (
    <Box>
      <p>
        {entry.date} {entry.description}
      </p>
      <ul>
        {entry.diagnosisCodes?.map((dg) => {
          return (
            <li key={dg}>
              {dg} {diagnoses.find((d) => d.code === dg)?.name}
            </li>
          );
        })}
      </ul>
    </Box>
  );
};

export default Entry;
