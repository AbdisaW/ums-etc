// src/services/auth.service.js
import bcrypt from 'bcryptjs';
import { findUserByEmail, findUserById } from '../repositories/auth.repository.js';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt.util.js';
import logger from '../utils/logger.js';

export async function login({ email, password }) {
    logger.info("LoginService called: %o", { email });

    const user = await findUserByEmail(email);
    if (!user) {
        // Log the real reason (user missing)
        logger.warn(`Login failed: user not found for email ${email}`);
        throw new Error("Invalid email or password"); // Generic message for client
    }

    const validPassword = await bcrypt.compare(password, user.password);


    if (!validPassword) {
        // Log the real reason (wrong password)
        logger.warn(`Login failed: wrong password for email ${email}`);
        throw new Error("Invalid email or password"); // Generic message for client
    }


    if (user.role === "LIBRARIAN" && !user.approved) {
        logger.error(`Login blocked : Librarian ${user.email}`)
        throw new Error("Librarian not approved");
    }


    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    return {
        user: { id: user.id, name: user.name, email: user.email, role: user.role, approved: user.approved },
        accessToken,
        refreshToken
    };
}

export async function refreshTokenService(token) {
    if (!token) throw new Error("Missing refresh token");

    const decoded = verifyRefreshToken(token);
    const user = await findUserById(decoded.id);

    if (!user) throw new Error("User not found");

    const newAccessToken = generateAccessToken(user);
    return { accessToken: newAccessToken };
}
