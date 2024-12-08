import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { AuthContextProvider } from "./context/AuthContext";
import { DarkModeContextProvider } from "./context/darkModeContext";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <DarkModeContextProvider>
        <App />
      </DarkModeContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
