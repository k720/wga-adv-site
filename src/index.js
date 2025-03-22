import React from 'react';
import ReactDOM from 'react-dom/client';  // Atualize a importação
import './index.css'; 
import { CssBaseline, ThemeProvider, Box } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Navbar from './components/Navbar'; 
import Banner from './components/Banner';
import WhoWeAre from './components/WhoWeAre' 
import Equipe from './components/Team'; 
import Servicos from './components/Services'; 
import NossosNumeros from './components/Numbers'; 
import Contato from './components/Contact'; 
import Blog from './components/Blog'; 
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

// Definindo o tema com as cores fornecidas
const theme = createTheme({
  palette: {
    primary: {
      main: '#624F8C', // Cor principal
    },
    secondary: {
      main: '#6CAFD9', // Cor secundária
    },
    background: {
      default: '#F1F2EB', // Cor de fundo
    },
    text: {
      primary: '#0D0D0D', // Cor do texto
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

// Componente principal da aplicação
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <Banner />
        <WhoWeAre />
        <Equipe />
        <NossosNumeros />
        <Servicos />
        <Contato />
        <Blog />
        <Footer />
        <WhatsAppButton />
      </Box>
    </ThemeProvider>
  );
}

// Alteração no código: usando createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
