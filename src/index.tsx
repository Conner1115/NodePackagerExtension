import { HandshakeProvider } from '@replit/extensions-react';
import { createRoot } from 'react-dom/client';
import App from './App';
import ThemeProvider from './components/ThemeProvider';

createRoot(document.getElementById('root') as HTMLElement).render(
  <HandshakeProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </HandshakeProvider>
)