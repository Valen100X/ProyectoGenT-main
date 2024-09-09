import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI; // Configura la URI de tu base de datos en Vercel Environment Variables
let client;
let clientPromise;

if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default async (req, res) => {
  if (req.method === "POST") {
    const { nombre, email, dni, causa, tipoDonacion } = req.body;

    try {
      const client = await clientPromise;
      const db = client.db("nombreBaseDeDatos");

      const collection = db.collection("donaciones");

      await collection.insertOne({
        nombre,
        email,
        dni,
        causa,
        tipoDonacion,
        fecha: new Date(),
      });

      res.status(200).json({ message: "Donación recibida con éxito" });
    } catch (error) {
      res.status(500).json({ error: "Error al guardar la donación" });
    }
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
};
