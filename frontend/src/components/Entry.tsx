import { Box } from "@mui/material";
import { Entry as EntryType } from "../types";

interface EntryProps {
  entry: EntryType;
}

const Entry = (props: EntryProps) => {
  const { entry } = props;
  return (
    <Box>
      <p>
        {entry.date} {entry.description}
      </p>
      <ul>
        {entry.diagnosisCodes?.map((dg) => {
          return <li key={dg}>{dg}</li>;
        })}
      </ul>
    </Box>
  );
};

export default Entry;
