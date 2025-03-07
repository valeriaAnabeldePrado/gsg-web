import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

export const obtenerProductos = async () => {
  try {
    await client.connect();
    const db = client.db('gsg');
    let productos;

    productos = await db.collection('products').find({}).toArray();

    return productos;
  } catch (err) {
    console.error('Error al obtener productos:', err);
  } finally {
    await client.close();
  }
};

export const getAccessories = async () => {
  try {
    await client.connect();
    const db = client.db('gsg');
    let accessories;

    accessories = await db.collection('accessories').find({}).toArray();

    return accessories;
  } catch (err) {
    console.error('Error al obtener accesorios:', err);
  } finally {
    await client.close();
  }
};

export const searchById = async (id) => {
  try {
    await client.connect();
    const db = client.db('gsg');

    const objectId = ObjectId.createFromHexString(id);

    const producto = await db.collection('products').findOne({ _id: objectId });

    console.log('producto recibido', producto);
    return producto;
  } catch (err) {
    console.error('Error al obtener productos:', err);
  } finally {
    await client.close();
  }
};
