import * as bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/UserRepository";
import { UserRole } from "../generated/prisma";

export async function register(name: string, email: string, password: string, role: UserRole) {
  const user = await UserRepository.findByEmail(email)
  if (user) throw new Error('Email already in use')
  const hashed = await bcrypt.hash(password, 10);
  return UserRepository.create({ name, email, role, hashedPassword: hashed })
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
