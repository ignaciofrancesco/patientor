// src/context/PatientsContext.tsx
import { createContext, ReactNode, useEffect, useState } from "react";
import patientService from "../services/patients";
import { Notification as NotificationType, Patient } from "../types";

// Type for the CONTEXT
interface PatientsContextType {
  patients: Patient[];
  setPatients: (patients: Patient[]) => void;
  notification: NotificationType | null;
  setNotification: (notification: NotificationType | null) => void;
}

// Create the CONTEXT
export const PatientsContext = createContext<PatientsContextType | undefined>(
  undefined
);

// Create the PROVIDER
export const PatientsProvider = ({ children }: { children: ReactNode }) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );

  useEffect(() => {
    const fetchPatientList = async () => {
      const newPatients = await patientService.getAll();
      setPatients(newPatients);
    };
    void fetchPatientList();
  }, [setPatients]);

  return (
    <PatientsContext.Provider
      value={{ patients, setPatients, notification, setNotification }}
    >
      {children}
    </PatientsContext.Provider>
  );
};
