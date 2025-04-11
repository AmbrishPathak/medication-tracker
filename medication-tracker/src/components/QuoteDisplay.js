import React, { useState, useEffect } from 'react';
// Import MUI components
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'; // Optional icon


const quotes = [
  "The greatest wealth is health.",
  "Take care of your body. It's the only place you have to live.",
  "A little progress each day adds up to big results.",
  "Believe you can and you're halfway there.",
  "Your health is an investment, not an expense.",
  "Consistency is key to achieving your health goals.",
  "One day at a time, one dose at a time.",
  // Add many more quotes here
];

function QuoteDisplay() {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const today = new Date().toDateString();
    const lastQuoteDate = localStorage.getItem('lastQuoteDate');

    if (lastQuoteDate !== today) {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const newQuote = quotes[randomIndex];
      setQuote(newQuote);
      localStorage.setItem('dailyQuote', newQuote);
      localStorage.setItem('lastQuoteDate', today);
    } else {
      setQuote(localStorage.getItem('dailyQuote') || quotes[0]);
    }
  }, []);

  return (
    // Use Paper component for elevation and background
    <Paper elevation={1} sx={{ p: 2, my: 2, bgcolor: 'grey.100', borderLeft: '4px solid', borderColor: 'primary.main' }}>
      <Typography variant="body1" component="p" sx={{ fontStyle: 'italic' }}>
         <FormatQuoteIcon sx={{ verticalAlign: 'bottom', mr: 0.5, fontSize: '1.1rem' }}/> {/* Optional Icon */}
         {quote}
      </Typography>
    </Paper>
  );
}

export default QuoteDisplay;