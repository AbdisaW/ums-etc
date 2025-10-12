import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
export default {
  async up(queryInterface, Sequelize) {
    const adminPassword = await bcrypt.hash('admin123', 10);

    await queryInterface.bulkInsert('users', [
      {
        id: uuidv4(),
        name: 'Admin User',
        email: 'admin@example.com',
        password: adminPassword,
        role: 'ADMIN',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Regular User',
        email: 'user@example.com',  // Ensure this email is unique
        password: await bcrypt.hash('user123', 10),
        role: 'USER',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],{ ignoreDuplicates: true });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};