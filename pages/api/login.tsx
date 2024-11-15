// pages/api/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../app/utils/mongodb';
import bcrypt from 'bcrypt';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Por favor, completa todos los campos.' });
    }

    const db = await connectToDatabase();

    // Verificar si el usuario existe
    const user = await db.collection('users').findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    // Comparar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    res.status(200).json({ message: 'Inicio de sesión exitoso.' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
};