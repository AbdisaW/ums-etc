import { DataTypes, UUIDV4 } from "sequelize";

export default (sequelize) => {
  return sequelize.define("books", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publishedYear: {
      type: DataTypes.INTEGER,
    },
    totalCopies: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
    availableCopies: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  
  });
}