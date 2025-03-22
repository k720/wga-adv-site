import React, { useEffect, useState } from "react";
import { client } from "../sanity/client";
import { Box, Typography, Grid, Card, CardContent, Button } from "@mui/material";
import { PortableText } from "@portabletext/react";
import { FaGavel, FaUsers, FaUniversity, FaBriefcase, FaMoneyCheckAlt , FaBalanceScale } from "react-icons/fa";

const iconMap = {
  "Direito Civil": <FaGavel size={50} color="#395D73" />,
  "Direito Público": <FaUsers size={50} color="#395D73" />,
  "Direito Empresarial": <FaUniversity size={50} color="#395D73" />,
  "Direito Trabalhista": <FaBriefcase size={50} color="#395D73" />,
  "Direito Previdenciário": <FaMoneyCheckAlt  size={50} color="#395D73" />,
};

const Services = () => {
  const [services, setServices] = useState([]);
  const [contacto, setContacto] = useState(null);

  useEffect(() => {
    client.fetch(`*[_type == "services"]`).then((data) => setServices(data));
    client.fetch(`*[_type == "contact" && title == "whatsapp-comercial"]`).then((data) => {
      if (data?.length > 0) setContacto(data[0]);
    });
  }, []);

  return (
    <Box id="servicos" sx={{ textAlign: "center", paddingTop: "40px", paddingX: "20px", maxWidth: "1200px", margin: "0 auto" }}>
    <Typography variant="h2" className="team-title">
      Áreas de Atuação
    </Typography>
    <Grid container spacing={2} sx={{ justifyContent: "center", width: "100%" }}>
      {services.map((service) => (
        <Grid item xs={12} sm={6} md={4} lg={4} key={service._id}>
          <Card
            sx={{
              position: "relative",
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: 3,
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                backgroundColor: "#f5f5f5",
              },
              overflow: "hidden",
              height: "350px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <CardContent sx={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
              {/* Ícone acima do título */}
              <Box sx={{ marginBottom: "10px" }}>
                {iconMap[service.title] || <FaBalanceScale size={50} color="#395D73" />}
              </Box>

              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "#395D73",
                  fontSize: "1.8rem",
                  textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
                }}
                className="services-title"
              >
                {service.title}
              </Typography>

              <Box
                sx={{
                  opacity: 0,
                  position: "absolute",
                  inset: 0,
                  transition: "opacity 0.3s ease, background-color 0.3s ease",
                  backgroundColor: "#395D73",
                  color: "white",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  overflowY: "auto",
                  "&:hover": {
                    opacity: 1,
                  },
                }}
              >
                <Typography variant="h6" sx={{ marginBottom: "20px", color: "#F1F2EB", fontWeight: "bold" }}>
                  {service.title}
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: "15px", color: "#F1F2EB" }}>
                  <PortableText value={service.content} />
                </Typography>
                <Button
                  variant="outlined"
                  sx={{
                    color: "#fff",
                    borderColor: "#fff",
                    "&:hover": {
                      backgroundColor: "#fff",
                      color: "#128C7E",
                    },
                  }}
                  onClick={() => {
                    if (contacto?.content?.[0]?.children?.[0]?.text) {
                      const phoneNumber = contacto.content[0].children[0].text.replace(/\D/g, "");
                      window.open(`https://wa.me/${phoneNumber}`, "_blank");
                    } else {
                      console.error("Contato não disponível.");
                    }
                  }}
                >
                  Entrar em Contato
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
    <Box sx={{ height: "80px" }} />
  </Box>
  );
};

export default Services;
