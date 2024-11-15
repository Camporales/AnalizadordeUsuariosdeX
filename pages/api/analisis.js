import dbConnect from '../../utils/dbConnect'; // Asegúrate de tener una función para conectar a tu base de datos
import Analisis from '../../models/Analisis'; // Modelo de Mongoose para el análisis

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    // Guardar un nuevo análisis
    const { username, analysisData } = req.body;
    const newAnalysis = new Analisis({ username, analysisData });
    await newAnalysis.save();
    return res.status(201).json(newAnalysis);
  } else if (req.method === 'GET') {
    // Obtener análisis por usuario
    const { username } = req.query;
    const analyses = await Analisis.find({ username });
    return res.status(200).json(analyses);
  } else {
    return res.status(405).json({ message: 'Método no permitido' });
  }
}