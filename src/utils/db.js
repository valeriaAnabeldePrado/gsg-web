import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;
let client;
let db;

// Función para conectar a MongoDB (reutiliza la conexión)
const connectDB = async () => {
  if (!client) {
    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    db = client.db('gsg');
    console.log('✅ MongoDB conectado');
  }
  return db;
};

export const obtenerProductos = async () => {
  try {
    const db = await connectDB();
    return await db.collection('products').find({}).toArray();
  } catch (err) {
    console.error('❌ Error al obtener productos:', err);
    throw err;
  }
};

export const getAccessories = async () => {
  try {
    const db = await connectDB();
    return await db.collection('accessories').find({}).toArray();
  } catch (err) {
    console.error('❌ Error al obtener accesorios:', err);
    throw err;
  }
};

export const searchById = async (id) => {
  try {
    const db = await connectDB();
    const objectId = new ObjectId(id);
    const producto = await db.collection('products').findOne({ _id: objectId });

    if (!producto) {
      console.warn(`⚠️ Producto con ID ${id} no encontrado`);
      return null;
    }

    console.log('📦 Producto encontrado:', producto);
    return producto;
  } catch (err) {
    console.error('❌ Error al obtener producto por ID:', err);
    throw err;
  }
};
