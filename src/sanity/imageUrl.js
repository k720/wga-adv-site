// src/sanity/imageUrl.js
import imageUrlBuilder from '@sanity/image-url';
import { client } from './client';  // Importa o client que você já configurou

const builder = imageUrlBuilder(client);

// Função para gerar a URL da imagem
export const urlFor = (source) => builder.image(source);
