import { Task, User } from '../../../database/models';
import logger from '../../../services/logger';

export default async function handler(req, res) {
  if(req.method === 'DELETE') {
    try {
      const { id } = req.query; 
      if (!id) {
        res.status(400).json({error: "Id is required for deletion"});
        return;
      }

      const deletedCount = await User.destroy({
        where: { id }
      });

      if (deletedCount === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ message: "User deleted successfully" });
      
    } catch (e) {
      logger.error(e.stack);
      res.status(400).json({
        error_code: 'delete_users',
        message: e.message,
      });
    }
  } else if(req.method === 'POST') {
    try {
        const { id } = req.query;
        const { user } = req.body;

        const [affectedCount] = await User.update(
            { name: user, email: '' }, // The task column to be updated
            {
              where: { id } // Condition specifying the target row
            }
          );
      
          if (affectedCount === 0) {
            throw new Error('No Todo found with the given ID');
          }
      
          res.status(201).json({id: id, name: user});

        
    } catch (error) {
        console.error('Error updating Todo:', error.message);
        throw error; // Ensure the calling function handles errors appropriately
    }
  } else {
    res.setHeader('Allow', ['DELETE', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
  
}
