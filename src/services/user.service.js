import bcrypt from 'bcryptjs';
import validator from 'validator';
import logger from "../utils/logger.js";

import { userRepository } from '../repositories/user.repository.js';
import { CreateUserDTO, UserResponseDTO } from '../dto/user.dto.js';

export const userService = {
  async register(data) {
    const { name, email, password, role = 'USER' } = data;
    logger.info("UserService.register called: %o", { email, role });
    // Basic validation
    if (!name || !email || !password) {
      logger.warn("Validation failed: missing fields")
      throw new Error('name,email,password required');
    }
    if (!validator.isEmail(email)) throw new Error('Invalid email');

    // Check if email exists
    const existing = await userRepository.findByEmail(email);
    if (existing) throw new Error('Email already exists');

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const approved = role.toUpperCase() === "LIBRARIAN" ? false : true;

    // Create user
    const newUser = await userRepository.create({
      name,
      email,
      password: hashedPassword,
      role: role.toUpperCase(),
      approved
    });

    logger.info("New User created : %o", { id: newUser.id, email: newUser.email })
    const userObj = newUser.get({ plain: true });

    // Return without password
    const { password: _, ...safeUser } = userObj;
    return safeUser;
  },

  async update(userId, updates, currentUser) {
    const user = await userRepository.findById(userId);
    if (!user) {
      logger.error(`User not found. userId: ${userId}, currentUserId: ${currentUser.id}`)
      throw new Error('User not found');

    }
    if (currentUser.role !== 'ADMIN' && currentUser.id !== userId) {
      logger.warn(`Access denied. currentUserId: ${currentUser.id}, userId: ${userId}`);
      throw new Error('Access denied');
    }


    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
      logger.info(`Password updated for userId: ${userId}`);
    }
    logger.info(`User update prepared successfully. userId: ${userId}, updates: ${JSON.stringify(updates)}`);

    const updated = await userRepository.update(userId, updates);
    return new UserResponseDTO(updated);
  },

  async delete(userId, currentUser) {
    if (currentUser.role !== 'ADMIN' && currentUser.id !== userId) throw new Error('Access denied');
    const deleted = await userRepository.delete(userId);
    if (!deleted) throw new Error('User not found');
    return new UserResponseDTO(deleted);
  },

  async getById(userId) {
    const user = await userRepository.findById(userId);
    if (!user) throw new Error('User not found');
    return new UserResponseDTO(user);
  },

  async getAll() {
    const list = await userRepository.findAll();
    return list.map(u => new UserResponseDTO(u));
  },

  async search(q) {
    const list = await userRepository.search(q);
    return list.map(u => new UserResponseDTO(u));
  },
  async approveLibrarian(userId, currentUser) {
    // Only ADMINs can approve
    if (currentUser.role !== 'ADMIN') {
      throw new Error('Access denied');
    }

    const user = await userRepository.findById(userId);
    if (!user) throw new Error('User not found');
    if (user.role !== 'LIBRARIAN') throw new Error('Only librarians can be approved');

    // Update DB
    const updated = await userRepository.update(userId, { approved: true });

    return new UserResponseDTO(updated);
  }
};
