import { Entry } from "../../types";
import { assertNever } from "../../utils";
import HealthCheckEntry from "./HealthCheckEntry";
import HospitalEntry from "./HospitalEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";

interface EntryDetailsProps {
  entry: Entry;
}

const EntryDetails = (props: EntryDetailsProps) => {
  const { entry } = props;

  switch (entry.type) {
    case "HealthCheck": {
      return <HealthCheckEntry entry={entry} />;
    }
    case "Hospital": {
      return <HospitalEntry entry={entry} />;
    }
    case "OccupationalHealthcare": {
      return <OccupationalHealthcareEntry entry={entry} />;
    }
    default:
      assertNever(entry); // exhaustive type checking
  }
};

export default EntryDetails;
