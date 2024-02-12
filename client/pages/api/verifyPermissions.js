// File: /pages/api/verify-permission.js
// got this from this video https://www.youtube.com/watch?v=mOvW3iheF14&t=2s

// import clientPromise from './auth/lib/mongodb';

//
//  Kyle: This isnt being used, but I'm keeping it here for reference. It shows how to use the mongodb clientand query the database
//

const clientPromise = require('./auth/lib/mongodb');
let db;
let client;
let users;

async function init() {
    if(db) return
    try {
        client = await clientPromise;
        db = client.db();
        users = db.collection('users');
    } catch(error){
        throw new Error('Failed to connect to database');
    }
}

export async function getUsers(){
    console.log('getUsers');
    try {
        // console.log('getUsers try');
        if (!users) await init();
        const result = await users
        .find({})
        .map(user => ({ ...user, _id: user._id.toString() }))
        .toArray();
        // console.log('Result:', result);
        return { users: result }
    } catch (error) {
        return { error: "Failed to fetch users"}
    }
}


export async function verifyUsers(){
    users = await getUsers();
    
}

// export default async function handler(req, res) {
//   const { userId, path } = req.body;

//   if (!userId || !path) {
//     return res.status(400).json({ error: 'Missing parameters' });
//   }

//   const { db } = await connectToDatabase();
//   const user = await db.collection('users').findOne({ _id: userId });

//   // Implement your permission logic here
//         //   const hasPermission = /* Determine if the user has permission to access the path */;

//   if (hasPermission) {
//     res.status(200).json({ permission: true });
//   } else {
//     res.status(403).json({ permission: false });
//   }
// }
