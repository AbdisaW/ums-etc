// src/dto/user.dto.js
export class CreateUserDTO {
  constructor({ name, email, password, role }) {
    this.name = name;
    this.email = email?.toLowerCase();
    this.password = password;
    this.role = (role || 'USER').toUpperCase();
  }
}

export class UserResponseDTO {
  constructor(user) {
    // user may be plain object or Sequelize instance
    const data = user.toJSON ? user.toJSON() : user;
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.role = data.role;
    this.approved = data.approved ?? null;
    this.createdAt = data.createdAt;
  }
}
