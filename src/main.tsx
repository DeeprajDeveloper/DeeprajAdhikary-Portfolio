import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@design-system/index';
import { AnnotateProvider } from '@/context/AnnotateContext';
import { logConsoleEgg } from '@/utils/consoleEgg';
import App from './App';
import '@design-system/styles/globals.scss';

logConsoleEgg();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <AnnotateProvider>
          <App />
        </AnnotateProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
