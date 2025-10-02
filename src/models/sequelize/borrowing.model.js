import { DataTypes } from "sequelize";

export default (sequelize) => {
    return sequelize.define('borrowings', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        bookId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        borrowDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull : true
        },
        returnDate: {
            type: DataTypes.DATE,
            allowNull: true
        }
        



    });

}