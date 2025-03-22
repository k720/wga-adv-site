import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Box, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import logo from '../assets/logo-removebg.png';

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
      setScrolled(window.scrollY > 50); 
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
        backgroundColor: scrolled ? '#1f1f1fea' : '#1f1f1f',
        backdropFilter: 'blur(10px)',
        transition: 'background-color 0.3s, backdrop-filter 0.3s',
      }}
    >
      <Toolbar sx={{ minHeight: { xs: "70px", sm: "80px" }, justifyContent: 'space-between', px: 2 }}>
        {/* Logo Responsiva */}
        <Box
          component="img"
          src={logo}
          alt="logo"
          sx={{
            height: { xs: "50px", sm: "60px" },  // Mantendo um tamanho fixo
            maxHeight: "100%",  // Evita que ultrapasse o Navbar
            width: "auto",  // Mantém proporção
            position: "absolute",
            left: isMobile ? "50%" : "20px",
            transform: isMobile ? "translateX(-50%)" : "none",
            top: isMobile ? "12px" : "8px", 
          }}
        />

        {/* Menu Desktop */}
        {!isMobile ? (
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', ml: 'auto' }}>
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
          <IconButton 
            color="inherit" 
            edge="end" 
            onClick={() => setMobileOpen(true)}
            sx={{ position: 'absolute', right: 20 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Drawer (Menu Lateral para Mobile) */}
        <Drawer
          anchor="right"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          sx={{
            '& .MuiDrawer-paper': {
              backgroundColor: '#1f1f1f',
              color: '#F1F2EB',
            },
          }}
        >
          <List sx={{ width: 250 }}>
            {menuItems.map((item, index) => (
              <ListItem button key={index} onClick={() => { handleScrollToSection(item.sectionId); setMobileOpen(false); }}>
                <ListItemText primary={item.label} sx={{ textAlign: 'center' }} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
