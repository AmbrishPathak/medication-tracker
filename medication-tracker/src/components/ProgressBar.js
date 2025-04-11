import React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';

function ProgressBar({ percentage }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}> {/* Add margin top/bottom */}
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" value={percentage} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${percentage}%`}</Typography>
      </Box>
    </Box>
  );
}

export default ProgressBar;