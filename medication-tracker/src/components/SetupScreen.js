import React, { useState } from 'react';
// Import MUI components
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function SetupScreen({ onStart }) {
  const [duration, setDuration] = useState('10');
  const [dosesPerDay, setDosesPerDay] = useState('1');

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalDoses = parseInt(duration) * parseInt(dosesPerDay);
    const today = new Date();
    const newSchedule = [];
    let doseCount = 0;
    for (let i = 0; i < parseInt(duration); i++) {
      let currentDay = new Date(today);
      currentDay.setDate(today.getDate() + i);
      for (let j = 0; j < parseInt(dosesPerDay); j++) {
        doseCount++;
        newSchedule.push({
          id: `dose-${doseCount}`,
          day: i + 1,
          doseNumber: j + 1,
          date: currentDay.toISOString().split('T')[0],
          taken: false,
        });
      }
    }
    onStart(newSchedule);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}> {/* Add margin top */}
      <Typography variant="h6" gutterBottom>Setup Your Plan</Typography>
      <FormControl fullWidth margin="normal"> {/* Make controls take full width */}
        <InputLabel id="duration-label">Duration (days)</InputLabel>
        <Select
          labelId="duration-label"
          id="duration"
          value={duration}
          label="Duration (days)"
          onChange={(e) => setDuration(e.target.value)}
        >
          <MenuItem value="10">10 Days</MenuItem>
          <MenuItem value="30">1 Month (30 Days)</MenuItem>
          <MenuItem value="180">6 Months (180 Days)</MenuItem>
          <MenuItem value="365">1 Year (365 Days)</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel id="doses-label">Doses per day</InputLabel>
        <Select
          labelId="doses-label"
          id="doses"
          value={dosesPerDay}
          label="Doses per day"
          onChange={(e) => setDosesPerDay(e.target.value)}
        >
          <MenuItem value="1">1</MenuItem>
          <MenuItem value="2">2</MenuItem>
          <MenuItem value="3">3</MenuItem>
        </Select>
      </FormControl>
      <Button
        type="submit"
        variant="contained" // Gives filled button style
        sx={{ mt: 2 }} // Add margin top
      >
        Start Tracking
      </Button>
    </Box>
  );
}

export default SetupScreen;