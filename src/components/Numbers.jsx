import React, { useEffect, useState } from 'react';
import { client } from '../sanity/client';
import { Box, Typography, Grid } from '@mui/material';

const Numbers = () => {
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    // Buscando os dados dos números no Sanity
    client.fetch(`*[_type == "numbers"]`).then((data) => {
      setNumbers(data);
    });
  }, []);

  return (
    <Box id="numeros" sx={{ paddingTop: '40px', textAlign: 'center' }}>
      <Typography variant="h2" className="team-title">
        Nossos números
      </Typography>
      <Grid container spacing={1} justifyContent="center">
        {numbers.map((number) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={number._id}>
            <Box
              sx={{
                backgroundColor: '#624F8C',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)', // Aplica o zoom
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // Sombra de seleção
                  backgroundColor: '#5b4382', // Cor ao passar o mouse
                },
              }}
            >
              <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#F1F2EB', marginBottom: '10px' }}>
                {number.title}
              </Typography>
              <Typography sx={{ color: '#F1F2EB' }}>
                {number.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ height: "80px" }} />
    </Box>
  );
};

export default Numbers;
