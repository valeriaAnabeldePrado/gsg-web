import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

export const obtenerProductos = async () => {
  try {
    await client.connect();
    const db = client.db("Germi");
    let productos;

    productos = await db.collection("prod").find({}).toArray();

    return productos;
  } catch (err) {
    console.error("Error al obtener productos:", err);
  } finally {
    await client.close();
  }
};

export const searchById = async (id) => {
  try {
    await client.connect();
    const db = client.db("Germi");

    const objectId = ObjectId.createFromHexString(id);

    const producto = await db.collection("prod").findOne({ _id: objectId });

    console.log(producto);
    return producto;
  } catch (err) {
    console.error("Error al obtener productos:", err);
  } finally {
    await client.close();
  }
};
