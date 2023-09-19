import React from 'react';
import { Button, Container, Typography, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <Container component={Paper} elevation={0} style={{ padding: '24px', marginTop: '24px', textAlign: 'center' }}>
      <Typography variant="h2" color="error" gutterBottom>Oh no! 🙈</Typography>
      <Typography variant="h5" gutterBottom>Looks like we took a wrong turn somewhere...</Typography>
      <Typography variant="body1" paragraph>
        Error: NOT FOUND
      </Typography>
      <Box mt={4}>
        <Button variant="contained" color="primary" onClick={() => navigate('/')}>
          Take me home
        </Button>
      </Box>
    </Container>
  );
}
