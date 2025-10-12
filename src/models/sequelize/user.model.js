import { DataTypes } from 'sequelize';


export default (sequelize) => {
  return sequelize.define('users', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('ADMIN', 'USER', 'LIBRARIAN'), defaultValue: 'USER' },    
  }, {
    timestamps: true,
  });
};
