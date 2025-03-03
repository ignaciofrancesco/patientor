// Create a CUSTOM HOOK

import { useContext } from "react";
import { PatientsContext } from "./PatientsContext";

export const usePatientsContext = () => {
  const patientsContext = useContext(PatientsContext);
  if (!patientsContext) {
    throw new Error("PatientsContext must be used within a PatientsProvider");
  }
  return patientsContext;
};
