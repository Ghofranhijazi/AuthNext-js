import { authenticateToken } from '@/middleware/auth';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  authenticateToken(req, res, async () => {
    await dbConnect();
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
  });
}