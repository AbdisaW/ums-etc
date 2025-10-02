import { DataTypes } from 'sequelize';
import sequelize from '../../../config/database.js';
import { type } from 'os';


export default (sequelize) => {
  return sequelize.define('users', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('ADMIN', 'USER', 'LIBRARIAN'), defaultValue: 'USER' },
    approved: { type: DataTypes.BOOLEAN, defaultValue: true },
    
  }, {
    timestamps: true,
  });
};
