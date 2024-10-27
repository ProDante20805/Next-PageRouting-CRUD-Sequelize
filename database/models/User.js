// database/models/User.js

import { Model, DataTypes } from 'sequelize';
import sequelize from '../../database/database'; // Imported sequelize instance

class User extends Model {
  // Define user methods here if necessary
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // email: {
  //   type: DataTypes.STRING,
    
  // },
}, {
  sequelize,
  modelName: 'User', // Define your model name
  tableName: 'users', // Ensure this matches your actual table name
  timestamps: false,
});

export default User;
