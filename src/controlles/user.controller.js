// src/controllers/user.controller.js
import { userService } from '../services/user.service.js';
import logger from '../utils/logger.js';

export async function registerController(req, res) {
  try {
    const user = await userService.register(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function getAllUsers(req, res) {
  try {
    const users = await userService.getAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getMyProfile(req, res) {
  try {
    const user = await userService.getById(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

export async function updateUser(req, res) {
  try {
    const updated = await userService.update(req.params.id, req.body, req.user);
    res.json(updated);
  } catch (err) {
    logger.error(err)
    res.status(400).json({ error: err.message });
  }
}

export async function deleteUser(req, res) {
  try {
    const deleted = await userService.delete(req.params.id, req.user);
    res.json(deleted);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function searchUsers(req, res) {
  try {
    const q = req.query.q || '';
    const results = await userService.search(q);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getUserById(req, res) {
  try {
    const result = await userService.getById(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

export async function approveLibrarian(req, res) {
   try {
    const { id } = req.params;
    const currentUser = req.user; // comes from authenticate middleware

    const user = await userService.approveLibrarian(id, currentUser);

    res.json({
      message: 'Librarian approved',
      user
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}