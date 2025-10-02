import jwt from "jsonwebtoken";

export function generateAccessToken(user) {
  return jwt.sign(
    { id: user.id, role: user.role, approved: user.approved },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn:process.env.JWT_EXPIRES_IN || "15m" }
  );
}

export function generateRefreshToken(user) {
  return jwt.sign(
    { id: user.id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn:process.env.REFRESH_EXPIRES_IN || "7d" }
  );
}

export function verifyRefreshToken(token) {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
}
