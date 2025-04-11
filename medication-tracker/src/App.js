import React, { useState, useEffect } from 'react';
import SetupScreen from './components/SetupScreen';
import PlanScreen from './components/PlanScreen';
import QuoteDisplay from './components/QuoteDisplay';

// Import MUI theming capabilities
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper'; // Use Paper for background effect

// Define your custom theme (inspired by the image)
const theme = createTheme({
  palette: {
    primary: {
      main: '#FF6F00', // Bright Orange (adjust hex code as needed)
      contrastText: '#ffffff', // White text on orange buttons
    },
    secondary: {
      main: '#424242', // Dark grey for text or secondary elements
    },
    background: {
      default: '#f7f9fc', // Very light grey/blue background
      paper: '#ffffff', // White for cards/paper elements
    },
    text: {
        primary: '#212121', // Dark primary text
        secondary: '#757575', // Lighter secondary text
    }
  },
  typography: {
    fontFamily: 'sans-serif', // Or choose a specific modern font
    h4: {
      fontWeight: 700, // Bolder headings
    },
     h6: {
      fontWeight: 600,
    },
    // You can customize other variants too
  },
  components: {
      MuiButton: {
          styleOverrides: {
              root: {
                  borderRadius: '20px', // Rounded buttons like the image
                  textTransform: 'none', // Prevent uppercase text
                  padding: '8px 20px',
              }
          }
      },
      MuiCard: {
           styleOverrides: {
               root: {
                   borderRadius: '12px', // Slightly rounded cards
                   boxShadow: '0px 4px 12px rgba(0,0,0,0.05)' // Subtle shadow like image
               }
           }
      },
      MuiPaper: { // Base for cards
          styleOverrides: {
               root: {
                   borderRadius: '12px',
                   boxShadow: '0px 4px 12px rgba(0,0,0,0.05)'
               }
           }
      }
  }
});

function App() {
  const [schedule, setSchedule] = useState(() => {
    const savedSchedule = localStorage.getItem('medicationSchedule');
    return savedSchedule ? JSON.parse(savedSchedule) : null;
  });

  useEffect(() => {
    if (schedule) {
      localStorage.setItem('medicationSchedule', JSON.stringify(schedule));
    } else {
      localStorage.removeItem('medicationSchedule');
    }
  }, [schedule]);

  const handleStartTracking = (newSchedule) => {
    setSchedule(newSchedule);
  };

  const handleReset = () => {
    setSchedule(null);
    localStorage.removeItem('medicationSchedule');
  }

  return (
    // Provide the theme to the entire app
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Apply baseline styles & background color */}
       {/* Optional: Add a subtle gradient or image background via CSS */}
       <style jsx global>{`
        body {
          body {
  background-image: url('https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80'); /* Example medical/calm background */
  background-size: cover;
  background-position: center center;
  background-attachment: fixed; /* Keeps background static on scroll */
  background-color: #f7f9fc; /* Fallback color */
  background: linear-gradient(to bottom, #eef1f5, #f7f9fc);
}
        }
      `}</style>
      <Container maxWidth="sm">
         {/* Wrap main content in Paper for distinct background */}
        <Paper elevation={0} sx={{ my: 4, p: { xs: 2, sm: 3 }, backgroundColor: 'background.paper', borderRadius: '16px' }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" component="h1" gutterBottom color="primary">
              Medication Tracker
            </Typography>
            <QuoteDisplay />
            {!schedule ? (
              <SetupScreen onStart={handleStartTracking} />
            ) : (
              <PlanScreen schedule={schedule} setSchedule={setSchedule} onReset={handleReset} />
            )}
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;