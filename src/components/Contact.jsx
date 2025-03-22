import React, { useEffect, useState, useRef } from 'react';
import { client } from '../sanity/client';
import { Box, Typography, TextField, Button, CircularProgress } from '@mui/material';
import { urlFor } from '../sanity/imageUrl';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const [content, setContent] = useState(null);
    const [formSent, setFormSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
        setLoading(true);
        emailjs
            .sendForm(
                process.env.REACT_APP_EMAILJS_SERVICEID,  // Service ID
                process.env.REACT_APP_EMAILJS_TEMPLATE,   // Template ID
                form.current,                            // Form reference
                process.env.REACT_APP_EMAILJS_PUBLICKEY  // Public Key
            )
            .then(
                (result) => {
                    console.log("Email enviado com sucesso", result);
                    setLoading(false);
                    setFormSent(true);
                },
                (error) => {
                    console.error("Erro ao enviar o e-mail", error);
                    setLoading(false);
                }
            );
    };

    useEffect(() => {
        client.fetch(`*[_type == "content" && title == "Contato"]`).then((data) => {
            setContent(data[0]);
        });
    }, []);

    if (!content) return <div className="loading">Carregando...</div>;

    const imageUrl = urlFor(content.image).url();

    return (
        <Box id="contato" className="contato-container">
            {/* Imagem à esquerda */}
            <Box className="contato-imagem">
                <img src={imageUrl} alt="Imagem de contato" />
            </Box>

            {/* Formulário à direita */}
            <Box className="contato-form">
                <Typography variant="h4" className="contato-titulo">Entre em contato</Typography>

                <Box className="espacamento-texto"></Box>
                {formSent && (
                    <Typography
                        variant="h5"
                        component="h2"
                        style={{ color: 'white', marginLeft: 50 }}
                    >
                        Obrigado por entrar em contato!
                    </Typography>
                )}
                {loading && !formSent && (
                    <CircularProgress
                        style={{
                            alignSelf: 'center',
                            top: '25%',
                            bottom: '25%',
                            position: 'relative',
                        }}
                    />
                )}
                {!formSent && (
                    <form ref={form} onSubmit={sendEmail}>
                        <TextField name="nome" label="Nome" variant="outlined" fullWidth className="input" required />
                        <TextField name="email" label="Email" variant="outlined" fullWidth className="input" required />
                        <TextField name="telefone" label="Telefone" variant="outlined" fullWidth className="input" required />
                        <TextField name="assunto" label="Assunto" variant="outlined" fullWidth className="input" required />
                        <TextField
                            name="mensagem"
                            label="Mensagem"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            className="input"
                            required
                        />
                        <Button type="submit" variant="contained" className="botao-enviar">
                            Enviar
                        </Button>
                    </form>                
                )}
            </Box>
        </Box>
    );
};

export default Contact;
