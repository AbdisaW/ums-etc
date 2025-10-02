import { userRepository } from './user.repository.js';

export async function findUserByEmail(email) {
    return await userRepository.findByEmail(email);
}

export async function findUserById(id) {
    return await userRepository.findById(id);
}