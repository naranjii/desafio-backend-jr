import * as bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/UserRepository";
import { UserRole } from "../generated/prisma";
import { RegisterDto } from '../dtos/auth.dto';

export async function register(data: RegisterDto) {
  const { email, name, password } = data;
  const user = await UserRepository.findByEmail(email)
  if (user) throw new Error('Email already in use')
  const hashed = await bcrypt.hash(password, 10);
  return UserRepository.create({ name, email, role: 'approver', hashedPassword: hashed })
}

export async function login(email: string, password: string) {
  const user = await UserRepository.findByEmail(email);
  if (!user) throw new Error("User not found");
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid password");

  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || "secret", {
    expiresIn: "1h"
  });
}
