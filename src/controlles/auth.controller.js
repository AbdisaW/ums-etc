import { userService } from '../services/user.service.js';
import { login as loginService, refreshTokenService } from '../services/auth.service.js';
import { LoginDTO, } from '../dto/auth.dto.js';
import logger from '../utils/logger.js';

export async function register(req, res) {
  try {
    logger.info("Regester request body: %o ", req.body)
    const user = await userService.register(req.body);
    // Message based on role
    const messageKey = user.role === 'LIBRARIAN'
      ? 'messages.librarianPending'
      : 'messages.registerSuccess';

    logger.info("User Registered successfully: %o", { id: user.id, email: user.email });

    res.status(201).json({
      message: req.__(messageKey),
      user
    });
  } catch (error) {
    logger.error("Register error: %o", error)

    const errorMap = {
      'errors.emailExists': 'errors.emailExists',
      'errors.missingFields': 'errors.missingFields',
      'errors.invalidRole': 'errors.invalidRole',
      'errors.adminExists': 'errors.adminExists'
    };

    const errorKey = errorMap[error.message] || 'errors.serverError';
    res.status(400).json({
      error: req.__(errorKey, { message: error.message })
    });
  }
}

export async function login(req, res) {
  try {
    logger.info("log in request body: %o ", req.body)

    // Map request body to DTO
    const loginDTO = new LoginDTO(req.body);
    const result = await loginService(loginDTO);

    logger.info("User login successfully: %o", { name: result.user.name });

    res.json({
      message: req.__('messages.loginSuccess', { name: result.user.name }),
      user: result.user,
      accessToken: result.accessToken,
      refreshToken: result.refreshToken
    });
  } catch (error) {
    logger.error("user login error: %o", error)
    const errorMap = {
      'User not found': 'errors.userNotFound',
      'Invalid email or password': 'errors.invalidPassword',
      'Librarian not approved': 'errors.notApproved'
    };

    const errorKey = errorMap[error.message] || 'errors.serverError';
    res.status(400).json({ error: req.__(errorKey, { message: error.message }) });
  }
}

export async function refreshToken(req, res) {
  try {
    const { token, refreshToken } = req.body;
    const actualToken = token || refreshToken;

    if (!actualToken) {
      return res.status(400).json({
        error: req.__('errors.invalidToken', { message: 'Token missing' })
      });
    }

    // Pass the token string directly
    const result = await refreshTokenService(actualToken);

    res.json({
      message: req.__('messages.tokenRefreshed'),
      ...result
    });
  } catch (error) {
    const errorMap = {
      'Invalid token': 'errors.invalidToken',
      'Expired token': 'errors.invalidToken'
    };

    const errorKey = errorMap[error.message] || 'errors.serverError';
    res.status(403).json({ error: req.__(errorKey, { message: error.message }) });
  }
}

