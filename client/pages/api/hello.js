// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// http://localhost:3000/api/hello

import { getUsers, isAdmin } from './verifyPermissions';

export default async function handler(req, res) {
  let users
  users = await getUsers();
  // console.log('Users:', users)

  console.log("User id", req.query.id)
  let isUserAdmin = await isAdmin(req.query.id);
  console.log('Is user admin:', isUserAdmin)
  res.status(200).json({ users });
}
