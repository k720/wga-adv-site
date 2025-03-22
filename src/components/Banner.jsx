import React, { useEffect, useState } from 'react';
import { client } from '../sanity/client';
import { Box, Typography } from '@mui/material';
import { PortableText } from '@portabletext/react';
import { urlFor } from '../sanity/imageUrl';

const Banner = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    client.fetch(`*[_type == "content" && title == "Banner"]`).then((data) => {
      setContent(data[0]);
    });
  }, []);

  if (!content) return <div>Loading...</div>;

  const imageUrl = urlFor(content.image).url();

  return (
    <Box
      id="quem-somos"
      className="banner-container"
      style={{ backgroundImage: `url(${imageUrl})` }} // Aqui a imagem é puxada diretamente
    >
      {/* Sobreposição escura */}
      <Box className="banner-overlay" />

      {/* Conteúdo centralizado */}
      <Box className="banner-content">
        <Typography className="banner-text">
          <PortableText value={content.body} />
        </Typography>
      </Box>
    </Box>

    
  );
};

export default Banner;
