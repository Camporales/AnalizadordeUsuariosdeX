"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AnalizadorUsuariosSocial from '../components/AnalizadorUsuariosSocial';

export default function AnalizadorPage() {
  const router = useRouter();

  useEffect(() => {
    // Verificar si hay un token de autenticación en localStorage
    const token = localStorage.getItem('authToken'); // Cambia 'authToken' por el nombre que uses para almacenar el token

    if (!token) {
      router.push('/login'); // Redirigir a la página de inicio de sesión si no está autenticado
    }
  }, [router]);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Sistema de identificación de usuarios Reales y Bots en la era de la IA</h1>
      <AnalizadorUsuariosSocial />
    </div>
  );
}
