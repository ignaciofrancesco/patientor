import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.tsx";
import { PatientsProvider } from "./contexts/PatientsContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Router>
    <PatientsProvider>
      <App />
    </PatientsProvider>
  </Router>
);
