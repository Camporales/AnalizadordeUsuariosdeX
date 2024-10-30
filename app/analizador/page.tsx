import React from 'react';
import AnalizadorUsuariosSocial from '../components/AnalizadorUsuariosSocial';
import LoginRegister from '../components/LoginRegister'; // Importa el componente

export default function AnalizadorPage() {

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Sistema de identificación de usuarios Reales y Bots en la era de la IA</h1>
      <LoginRegister /> {/* Incluye el componente aquí */}
      <AnalizadorUsuariosSocial />
    </div>
  );
}
