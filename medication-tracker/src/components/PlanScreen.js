import React from 'react';
import ProgressBar from './ProgressBar';
// Import MUI components
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import FormControlLabel from '@mui/material/FormControlLabel'; // To label the Switch


function PlanScreen({ schedule, setSchedule, onReset }) {

  const handleToggleDose = (doseId) => {
    const updatedSchedule = schedule.map(dose =>
      dose.id === doseId ? { ...dose, taken: !dose.taken } : dose
    );
    setSchedule(updatedSchedule);
  };

  const totalDoses = schedule.length;
  const dosesTaken = schedule.filter(dose => dose.taken).length;
  const progressPercent = totalDoses > 0 ? Math.round((dosesTaken / totalDoses) * 100) : 0;

  return (
    <Box sx={{ mt: 3 }}> {/* Add margin top */}
      <Typography variant="h6" gutterBottom>Your Plan</Typography>
      <ProgressBar percentage={progressPercent} />
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {schedule.map(dose => (
          <Card key={dose.id} variant="outlined" sx={{
            mb: 1.5, // Margin bottom
            // Use theme colors explicitly if needed
            // backgroundColor: dose.taken ? 'grey.50' : 'background.paper'
            borderColor: 'divider' // Use theme's divider color for border
            }}>
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1.5, '&:last-child': { pb: 1.5 } }}>
                <Typography variant="body1" sx={{ textDecoration: dose.taken ? 'line-through' : 'none', opacity: dose.taken ? 0.6 : 1, color: 'text.primary' }}>
                Day {dose.day} - Dose {dose.doseNumber} <Typography variant="caption" display="block" color="text.secondary">({dose.date})</Typography>
                </Typography>
                <FormControlLabel
                    control={<Switch checked={dose.taken} onChange={() => handleToggleDose(dose.id)} color="primary" />} // Use primary theme color
                    label={dose.taken ? "Taken" : "Take"}
                    labelPlacement="start"
                />
            </CardContent>
        </Card>
        ))}
      </List>
      <Button onClick={onReset} variant="outlined" color="secondary" sx={{mt: 2}}>
    Reset Plan
</Button>
    </Box>
  );
}

export default PlanScreen;