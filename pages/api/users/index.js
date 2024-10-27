import { Task, User } from '../../../database/models';
import logger from '../../../services/logger';

export default async function handler(req, res) {
  if(req.method === 'GET') {
    try {  
      const users = await User.findAll();
      res.status(200).json({ users });
    } catch (e) {
      logger.error(e.stack);
      res.status(400).json({
        error_code: 'get_users',
        message: e.message,
      });
    }
  } else if (req.method === 'POST') {
    try {
      const { user } = req.body;

      if (!user) {
        res.status(400).json({ error: 'User name is required' });
        return;
      }
      const newUser = await User.create({name: user});
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error creating todo:', error); // Log the error for debugging
      res.status(500).json({ error: 'Failed to create todo' });
    }
  }
   else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
  
}
