import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

 function Loading() {
  return (
    <Box sx={{ display: 'flex', margin: '20px 20px', width: '120px' }}>
      <CircularProgress />
    </Box>
  );
}

export default Loading;