import clientPromise from './auth/lib/mongodb'; // Adjust the path according to your file structure

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db('Soen341-v1'); // Replace 'yourDatabaseName' with your actual database name

    // Replace 'yourCollection' with the name of your collection
    const data = await db.collection('car_rental_users').find({}).limit(20).toArray();

    res.status(200).json({ data });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Unable to connect to database or fetch data" });
  }
}
