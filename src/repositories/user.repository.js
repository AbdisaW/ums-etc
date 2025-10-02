// src/repositories/user.repository.js
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { User as FileUser } from '../models/file/userModel.js';
import { UserDB } from '../models/sequelize/index.js'; // ensure named export
const dataPath = path.join('data', 'users.txt');
const USE_DB = process.env.USE_DB === 'true';

// File helpers
async function readFileUsers() {
  try {
    const raw = await fs.readFile(dataPath, 'utf8');
    return JSON.parse(raw || '[]');
  } catch {
    return [];
  }
}
async function writeFileUsers(users) {
  await fs.mkdir(path.dirname(dataPath), { recursive: true });
  await fs.writeFile(dataPath, JSON.stringify(users, null, 2), 'utf8');
}

export const userRepository = {
  async findByEmail(email) {
    if (USE_DB) return await UserDB.findOne({ where: { email } });
    const users = await readFileUsers();
    return users.find(u => u.email.toLowerCase() === email.toLowerCase());
  },

  async findById(id) {
    if (USE_DB) return await UserDB.findByPk(id);
    const users = await readFileUsers();
    return users.find(u => u.id === id);
  },

  async findAll() {
    if (USE_DB) return await UserDB.findAll();
    return await readFileUsers();
  },

  async create(payload) {
    if (USE_DB) return await UserDB.create(payload);
    const users = await readFileUsers();
    const newUser = new FileUser({ id: uuidv4(), ...payload });
    users.push(newUser);
    await writeFileUsers(users);
    return newUser;
  },

  async update(id, updates) {
    if (USE_DB) {
      const user = await UserDB.findByPk(id);
      if (!user) return null;
      Object.assign(user, updates);
      await user.save();
      return user;
    }
    const users = await readFileUsers();
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) return null;
    users[idx] = { ...users[idx], ...updates };
    await writeFileUsers(users);
    return users[idx];
  },

  async delete(id) {
    if (USE_DB) {
      const u = await UserDB.findByPk(id);
      if (!u) return null;
      await u.destroy();
      return u;
    }
    const users = await readFileUsers();
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) return null;
    const [deleted] = users.splice(idx, 1);
    await writeFileUsers(users);
    return deleted;
  },

  async search(keyword) {
    if (USE_DB) {
      // example Sequelize search - requires importing Op if needed (later)
      const { Op } = (await import('sequelize')).default;
      return await UserDB.findAll({
        where: {
          [Op.or]: [
            { name: { [Op.like]: `%${keyword}%` } },
            { email: { [Op.like]: `%${keyword}%` } }
          ]
        }
      });
    }
    const users = await readFileUsers();
    return users.filter(u => u.name.toLowerCase().includes(keyword.toLowerCase()) ||
                               u.email.toLowerCase().includes(keyword.toLowerCase()));
  }
};
