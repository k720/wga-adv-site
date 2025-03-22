import React, { useEffect, useState } from 'react';
import { Fab } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { client } from '../sanity/client';

const WhatsAppButton = () => {
  const [contacto, setContacto] = useState(null);

  useEffect(() => {
    client.fetch(`*[_type == "contact" && title == "whatsapp-comercial"]`).then((data) => {
      if (data && data.length > 0) {
        setContacto(data[0]);  // Garantir que o valor existe
      }
    });
  }, []);

  const handleWhatsAppClick = () => {
    if (contacto) {
      const phoneNumber = contacto.content[0].children[0].text.replace(/\D/g, '');
      const whatsappMessage = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=Oi,%20preciso%20de%20ajuda!`;
      window.open(whatsappMessage, '_blank');
    }
  };

  return (
    <Fab
      color="primary"
      aria-label="WhatsApp"
      sx={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
        backgroundColor: '#25D366',
      }}
      onClick={handleWhatsAppClick}
    >
      <WhatsAppIcon />
    </Fab>
  );
};

export default WhatsAppButton;
