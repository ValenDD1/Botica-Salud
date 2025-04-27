import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import 'primereact/resources/themes/saga-blue/theme.css';
import { PrimeReactProvider } from "primereact/api";

const root=createRoot(document.getElementById('frontend'));
root.render(
  <StrictMode>
    <PrimeReactProvider>
      <App />
    </PrimeReactProvider>
  </StrictMode>
);
