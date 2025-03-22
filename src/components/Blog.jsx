import React, { useEffect, useState } from 'react';
import { client } from '../sanity/client';
import { urlFor } from '../sanity/imageUrl'; // Importando a função correta
import { Modal, Card, CardMedia, CardContent, Typography, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { PortableText } from '@portabletext/react';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    client.fetch(`*[_type == "post"]`).then((data) => {
      setPosts(data);
    });
  }, []);

  return (
    <Box id="blog" className="blog-container">
      <Typography variant="h2" className="team-title"
        sx={{ paddingTop: '40px', textAlign: 'center' }}
      >
        Blog
      </Typography>
      <Box className="blog-grid">
        {posts.map((post) => (
          <Card key={post._id} className="blog-card" onClick={() => setSelectedPost(post)}>
            {post.image.asset._ref && (
              <CardMedia 
                component="img" 
                image={urlFor(post.image.asset._ref).url()} 
                alt={post.title} 
                className="blog-image" 
              />
            )}
            <CardContent className="blog-card-content">
              <Typography variant="h6" className="blog-title">{post.title}</Typography>
              <Typography variant="body2" className="blog-preview">{post.preview}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Modal open={!!selectedPost} onClose={() => setSelectedPost(null)} className="blog-modal">
        <Box className="blog-modal-content">
          {selectedPost && (
            <>
              {/* Botão de Fechar no Canto Direito */}
              <IconButton 
                className="blog-modal-close" 
                onClick={() => setSelectedPost(null)}
              >
                <CloseIcon />
              </IconButton>

              {/* Imagem do Post */}
              {selectedPost.image.asset._ref && (
                <CardMedia
                  component="img"
                  image={urlFor(selectedPost.image.asset._ref).url()} 
                  alt={selectedPost.title}
                  className="blog-modal-image"
                />
              )}
              <Box className="blog-modal-text">
                {/* Título do Modal */}
                <Typography variant="h5" className="blog-modal-title">
                  {selectedPost.title}
                </Typography>
                <Box className="blog-modal-scroll">
                  <PortableText value={selectedPost.content} />
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default Blog;
