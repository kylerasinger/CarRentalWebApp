// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// http://localhost:3000/api/hello

import { getUsers } from './verifyPermissions';

export default async function handler(req, res) {
  let users
  users = await getUsers();
  // console.log('Users:', users)
  res.status(200).json({ users });
}
