import { Card, CardContent, Divider, Typography } from "@mui/material";
import { Diagnosis, Entry as EntryType } from "../../types";
import EntryDetails from "./EntryDetails";

interface EntryProps {
  entry: EntryType;
  diagnoses: Diagnosis[];
}

const Entry = (props: EntryProps) => {
  const { entry, diagnoses } = props;
  return (
    <Card
      variant="outlined"
      sx={{ minWidth: 275, maxWidth: 500, marginBottom: 2.5, marginTop: 2.5 }}
    >
      <CardContent>
        <Typography variant={"h6"} sx={{}}>
          {entry.date}
        </Typography>
        <Typography sx={{ fontStyle: "italic" }}>
          {entry.description}
        </Typography>
        <ul>
          {entry.diagnosisCodes?.map((dg) => {
            return (
              <li key={dg}>
                <Typography>
                  {dg} {diagnoses.find((d) => d.code === dg)?.name}
                </Typography>
              </li>
            );
          })}
        </ul>
        <Divider sx={{ marginBottom: 2.5 }} />
        <EntryDetails entry={entry} />
        <Typography>Diagnose by {entry.specialist}</Typography>
      </CardContent>
    </Card>
  );
};

export default Entry;
