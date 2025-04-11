import React, { useState, useEffect } from 'react';
// import './App.css'; // MUI provides baseline, remove or adjust basic CSS later
import SetupScreen from './components/SetupScreen';
import PlanScreen from './components/PlanScreen';
import QuoteDisplay from './components/QuoteDisplay';

// Import MUI components
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'; // Box is a versatile layout component

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
    <React.Fragment>
      <CssBaseline /> {/* Apply baseline styles */}
      <Container maxWidth="sm"> {/* Constrain width for better layout */}
        <Box sx={{ my: 4, textAlign: 'center' }}> {/* Add margin top/bottom */}
          <Typography variant="h4" component="h1" gutterBottom>
            Medication Tracker
          </Typography>
          <QuoteDisplay />
          {!schedule ? (
            <SetupScreen onStart={handleStartTracking} />
          ) : (
            <PlanScreen schedule={schedule} setSchedule={setSchedule} onReset={handleReset} />
          )}
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default App;