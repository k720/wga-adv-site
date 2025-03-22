import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Typography, Box, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const menuItems = [
    { label: "Quem Somos", sectionId: "quem-somos" },
    { label: "Sócios", sectionId: "equipe" },
    { label: "Nossos Números", sectionId: "numeros" },
    { label: "Serviços", sectionId: "servicos" },
    { label: "Contato", sectionId: "contato" },
    { label: "Blog", sectionId: "blog" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // Muda a cor se rolar mais de 50px
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: scrolled ? '#1f1f1fea' : '#1f1f1f', // Muda a cor após o scroll
        backdropFilter: 'blur(10px)', // Aplica o desfoque
        transition: 'background-color 0.3s, backdrop-filter 0.3s', // Suaviza a transição
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo Responsiva */}
        <Typography variant="h6" sx={{ flexGrow: 1, position: 'relative' }}>
          <Box component="img"
            src={logo}
            alt="logo"
            sx={{
              width: { xs: "120px", sm: "150px" },
              position: 'relative',
              top: '10px', // Desce um pouco o logo
              left: '100px' // Move o logo para a direita
            }}
          />
        </Typography>

        {/* Menu Desktop */}
        {!isMobile ? (
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            {menuItems.map((item, index) => (
              <Button
                key={index}
                sx={{ color: '#F1F2EB' }}
                onClick={() => handleScrollToSection(item.sectionId)}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        ) : (
          // Ícone de menu para Mobile
          <IconButton color="inherit" edge="end" onClick={() => setMobileOpen(true)}>
            <MenuIcon />
          </IconButton>
        )}

        {/* Drawer (Menu Lateral para Mobile) */}
        <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}>
          <List sx={{ width: 250 }}>
            {menuItems.map((item, index) => (
              <ListItem button key={index} onClick={() => { handleScrollToSection(item.sectionId); setMobileOpen(false); }}>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
