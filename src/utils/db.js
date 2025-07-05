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
    return await db.collection('accessories').find({ code: 'ACC' }).toArray();
  } catch (err) {
    console.error('❌ Error al obtener accesorios:', err);
    throw err;
  }
};
export const getLeds = async () => {
  try {
    const db = await connectDB();
    return await db.collection('accessories').find({ code: 'LED' }).toArray();
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

    return producto;
  } catch (err) {
    console.error('❌ Error al obtener producto por ID:', err);
    throw err;
  }
};

export const buscarProductosAvanzado = async (filtros = {}) => {
  try {
    const db = await connectDB();
    const modelosMatch = {};

    const query = {};

    // Filtro para categoria (nivel raíz)
    if (filtros.categoria && filtros.categoria !== 'Todos') {
      query.categoria = { $regex: `^${filtros.categoria}$`, $options: 'i' };
    }

    // Filtro por incluyeLed
    if (typeof filtros.incluyeLed === 'boolean') {
      modelosMatch['caracteristicasTecnicas.incluyeLed'] = filtros.incluyeLed;
    }

    //filtro para categoria

    // Filtro por incluyeEquipo
    if (typeof filtros.incluyeEquipo === 'boolean') {
      modelosMatch['caracteristicasTecnicas.incluyeEquipo'] =
        filtros.incluyeEquipo;
    }

    if (Array.isArray(filtros.color) && filtros.color.length > 0) {
      modelosMatch['caracteristicasTecnicas.color'] = {
        $in: filtros.color
          .filter((c) => c && c.trim() !== '')
          .map((c) => new RegExp(c, 'i')),
      };
    } else if (
      typeof filtros.color === 'string' &&
      filtros.color.trim() !== ''
    ) {
      modelosMatch['caracteristicasTecnicas.color'] = {
        $regex: filtros.color,
        $options: 'i',
      };
    }

    // Filtro por acabado (array o string, usando regex para coincidencia parcial)
    if (Array.isArray(filtros.acabado) && filtros.acabado.length > 0) {
      modelosMatch['caracteristicasTecnicas.acabado'] = {
        $in: filtros.acabado
          .filter((a) => a && a.trim() !== '')
          .map((a) => new RegExp(a, 'i')),
      };
    } else if (
      typeof filtros.acabado === 'string' &&
      filtros.acabado.trim() !== ''
    ) {
      modelosMatch['caracteristicasTecnicas.acabado'] = {
        $regex: filtros.acabado,
        $options: 'i',
      };
    }

    // Construir la query final

    if (Object.keys(modelosMatch).length > 0) {
      query.modelos = { $elemMatch: modelosMatch };
    }

    const productos = await db.collection('products').find(query).toArray();
    return productos;
  } catch (err) {
    console.error('❌ Error en búsqueda avanzada:', err);
    throw err;
  }
};
