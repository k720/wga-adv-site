import React, { useEffect, useState } from 'react';
import { client } from '../sanity/client';
import { Box, Typography, Grid, IconButton } from '@mui/material';
import { LinkedIn, Email } from '@mui/icons-material';
import { PortableText } from '@portabletext/react';
import { urlFor } from '../sanity/imageUrl';

const Team = () => {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    client.fetch(`*[_type == "team"]`).then((data) => {
      setTeam(data);
    });
  }, []);

  return (
    <div className="team-container" id="equipe">
      <Typography variant="h2" className="team-title">
        Sócios
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {team.map((member) => (
          <Grid item xs={12} sm={5} md={3} key={member._id}>
            <Box
              className="team-box"
              sx={{
                textAlign: 'left',
                backgroundColor: '#333',
                borderRadius: '10px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '350px', // Reduzindo altura fixa
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'translateY(-10px)',
                },
              }}
            >
              <img
                src={urlFor(member.image).url()}
                alt={member.name}
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginBottom: '10px',
                }}
              />
              <Typography variant="h6" sx={{ color: '#6CAFD9', marginBottom: '5px' }}>
                {member.name}
              </Typography>
              
              <Box
                className="team-box-desc"
                sx={{
                  flexGrow: 1, // Ocupa o espaço restante
                  overflowY: 'auto', // Scroll interno
                  maxHeight: '120px', // Garante que a altura seja limitada
                  paddingRight: '10px', // Ajuste para não esconder o scroll
                }}
              >
                <Typography variant="subtitle1" sx={{ color: '#ccc', marginBottom: '5px' }}>
                  {member.shortBio}
                </Typography>
                <Typography sx={{ color: '#fff', fontSize: '0.85rem', fontFamily: '"Open Sans", sans-serif' }}>
                  <PortableText value={member.bio} />
                </Typography>
              </Box>

              {/* Ícones sempre visíveis */}
              <Box sx={{ marginTop: '10px', textAlign: 'center' }}>
                {member.linkedin && (
                  <IconButton href={member.linkedin} target="_blank">
                    <LinkedIn sx={{ color: '#0e76a8' }} />
                  </IconButton>
                )}
                {member.email && (
                  <IconButton href={`mailto:${member.email}`} target="_blank">
                    <Email sx={{ color: '#f2a900' }} />
                  </IconButton>
                )}
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Team;
