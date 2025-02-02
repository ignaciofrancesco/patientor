import diagnosesData from "../../data/diagnoses";
import { Diagnose } from "../types";

const getAllDiagnoses = (): Diagnose[] => {
  const diagnoses = diagnosesData;
  return diagnoses;
};

export default { getAllDiagnoses };
