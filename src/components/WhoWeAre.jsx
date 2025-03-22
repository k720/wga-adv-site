import React, { useEffect, useState } from 'react';
import { client } from '../sanity/client';
import { Box, Typography } from '@mui/material';
import { PortableText } from '@portabletext/react';

const WhoWeAre = () => {
    const [content, setContent] = useState(null);

    useEffect(() => {
        client.fetch(`*[_type == "content" && title == "Quem Somos"]`).then((data) => {
            setContent(data[0]);
        });
    }, []);

    if (!content) return <div className="loading">Carregando...</div>;

    return (
        <Box className="who-we-are-container">
            <Typography variant="h2" className="team-title">
                {content.title}
            </Typography>
            <Box className="who-we-are-description">
                <PortableText value={content.body} />
            </Box>
        </Box>
    );
};

export default WhoWeAre;
