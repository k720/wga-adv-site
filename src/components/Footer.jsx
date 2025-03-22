import React, { useEffect, useState } from "react";
import { client } from "../sanity/client";
import { Box, Typography, Grid, IconButton } from "@mui/material";
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import logo from "../assets/logo.png";

// Mapeamento de ícones e cores oficiais
const iconMap = {
    "email-comercial": { icon: FaEnvelope, linkPrefix: "mailto:", color: "#D44638" },
    "telefone-comercial": { icon: FaPhone, linkPrefix: "tel:+", color: "#2266bf" },
    "whatsapp-comercial": { icon: FaWhatsapp, linkPrefix: "https://wa.me/+", color: "#25D366" },
    "facebook-comercial": { icon: FaFacebook, linkPrefix: "https://facebook.com/", color: "#1877F2" },
    "instagram-comercial": { icon: FaInstagram, linkPrefix: "https://instagram.com/", color: "#E4405F" },
    "linkedin-comercial": { icon: FaLinkedin, linkPrefix: "https://linkedin.com/in/", color: "#0077B5" },
    "endereco-comercial": { icon: FaMapMarkerAlt, linkPrefix: "https://www.google.com/maps/place/", color: "#FF5733" }
};

// Função para limpar caracteres especiais de números de telefone e WhatsApp
const cleanNumber = (number) => number.replace(/[^\d]/g, ""); // Remove tudo que não for número

const Footer = () => {
    const [contato, setContato] = useState([]);

    useEffect(() => {
        client.fetch(`*[_type == "contact"]`).then((data) => {
            setContato(data);
        });
    }, []);

    return (
        <Box className="footer-container">
            <Grid container spacing={2} justifyContent="center" alignItems="center">
                {/* Logo */}
                <Grid item xs={12} sm={6} md={3} className="footer-logo">
                    <img src={logo} alt="Logo" />
                </Grid>

                {/* Endereço e Horário de Funcionamento */}
                <Grid item xs={12} sm={6} md={3}>
                    <Box className="contact-info">
                        <Typography variant="h6" align="center">Endereço</Typography>
                        <ul>
                            {contato.map((item) => {
                                if (item.title === "endereco-comercial" || item.title === "Horários") {
                                    return (
                                        <li key={item._id}>
                                            <Typography variant="body1" align="center">
                                                {item.content?.[0]?.children?.[0]?.text}
                                            </Typography>
                                        </li>
                                    );
                                }
                                return null;
                            })}
                        </ul>
                    </Box>
                </Grid>

                {/* Ícones de Contato */}
                <Grid item xs={12} sm={6} md={3}>
                    <Box className="social-icons">
                        <Typography variant="h6" align="center">Entre em contato</Typography>
                        <Box className="icon-container">
                            {contato.map((item) => {
                                const iconInfo = iconMap[item.title];
                                if (iconInfo) {
                                    const IconComponent = iconInfo.icon;
                                    let linkValue = item.content?.[0]?.children?.[0]?.text || "";

                                    // Limpeza de número para telefone e WhatsApp
                                    if (item.title === "telefone-comercial" || item.title === "whatsapp-comercial") {
                                        linkValue = cleanNumber(linkValue);
                                    }

                                    const link = iconInfo.linkPrefix + linkValue;

                                    return (
                                        <IconButton
                                            key={item._id}
                                            component="a"
                                            href={link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="icon-button"
                                            style={{ color: iconInfo.color }}
                                        >
                                            <IconComponent size={28} />
                                        </IconButton>
                                    );
                                }
                                return null;
                            })}
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Footer;
