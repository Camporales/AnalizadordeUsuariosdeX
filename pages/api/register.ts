// pages/api/register.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../app/utils/mongodb';
import bcrypt from 'bcrypt';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Por favor, completa todos los campos.' });
    }

    const db = await connectToDatabase();

    // Verificar si el usuario ya existe
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'El usuario ya existe.' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Guardar el nuevo usuario
    await db.collection('users').insertOne({ email, password: hashedPassword });

    res.status(201).json({ message: 'Usuario creado exitosamente.' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
};