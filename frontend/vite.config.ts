import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  // Optional proxy. Useful if i dont want to set up the cors policy in the backend (only for dev)
  // server: {
  //   proxy: {
  //      '/api': 'http://localhost:3000',
  //   },
  // },
  plugins: [react()],
});
