'use strict';

import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

export default {
  async up(queryInterface, Sequelize) {
    // Hash passwords
    const adminPassword = await bcrypt.hash('admin123', 10);

    await queryInterface.bulkInsert('Users', [
      {
        id: uuidv4(),
        name: 'Admin User',
        email: 'admin@example.com',
        password: adminPassword,
        role: 'ADMIN',
        approved: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      
      
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
