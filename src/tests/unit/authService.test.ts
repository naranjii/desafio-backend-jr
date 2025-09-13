import * as AuthService from "../../services/AuthService";
import { UserRepository } from "../../repositories/UserRepository";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { clearDB } from "../helpers";
import { prisma } from "../../config/db";
import {  vi } from "vitest";

vi.mock("../../repositories/UserRepository");
vi.mock("bcryptjs", () => ({
	hash: vi.fn(),
	compare: vi.fn(),
}));

describe("AuthService", () => {
	beforeEach(async () => {
		await clearDB();
	});

	afterAll(async () => {
		await clearDB();
		await prisma.$disconnect();
		vi.clearAllMocks();
		vi.restoreAllMocks();
	});

	describe("register", () => {
		it("hashes password and creates user", async () => {
			// biome-ignore lint/suspicious/noExplicitAny: <simple bcrypt mock>
			(bcrypt.hash as any).mockResolvedValue("hashed-pass");

			const repositoryMock = vi
				.spyOn(UserRepository, "create")
				.mockResolvedValue({
					id: "uuid-123",
					name: "Mat",
					email: "mat@test.com",
					role: "consultant",
				});

			const user = await AuthService.register({
				email: "mat@test.com",
				name: "Mat",
				password: "pass123",
			});

			expect(bcrypt.hash).toHaveBeenCalledWith("pass123", 10);

			expect(repositoryMock).toHaveBeenCalledWith({
				name: "Mat",
				email: "mat@test.com",
				role: "consultant",
				hashedPassword: "hashed-pass",
			});

			expect(user).toEqual({
				id: "uuid-123",
				name: "Mat",
				email: "mat@test.com",
				role: "consultant",
			});
		});

		it("throws if email already in use", async () => {
			vi.spyOn(UserRepository, "findByEmail").mockResolvedValue({
				id: "uuid-123",
				email: "mat@test.com",
				password: "hashed-pass",
				name: "Mat",
				role: "consultant",
			});

			await expect(
				AuthService.register({
					email: "mat@test.com",
					name: "Mat",
					password: "pass123",
				}),
			).rejects.toThrow("Email already in use");
		});
	});

	describe("login", () => {
		it("returns JWT when password matches", async () => {
			vi.spyOn(UserRepository, "findByEmail").mockResolvedValue({
				id: "uuid-123",
				email: "mat@test.com",
				password: "hashed",
				role: "consultant",
				name: "Supla",
			});

			// biome-ignore lint/suspicious/noExplicitAny: <simple bcrypt mock>
			(bcrypt.compare as any).mockResolvedValue(true);

			const token = await AuthService.login("mat@test.com", "pass123");
			expect(bcrypt.compare).toHaveBeenCalledWith("pass123", "hashed");

			const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
			// biome-ignore lint/suspicious/noExplicitAny: <simple bcrypt mock>
			expect((decoded as any).id).toBe("uuid-123");
		});

		it("throws if user not found", async () => {
			vi.spyOn(UserRepository, "findByEmail").mockResolvedValue(null);

			await expect(
				AuthService.login("mat@test.com", "pass123"),
			).rejects.toThrow("User not found");
		});

		it("throws if password does not match", async () => {
			vi.spyOn(UserRepository, "findByEmail").mockResolvedValue({
				id: "uuid-123",
				email: "mat@test.com",
				password: "hashed",
				role: "consultant",
				name: "Supla",
			});

			// biome-ignore lint/suspicious/noExplicitAny: <simple bcrypt mock>
			(bcrypt.compare as any).mockResolvedValue(false);

			await expect(
				AuthService.login("mat@test.com", "pass123"),
			).rejects.toThrow("Invalid email or password");
		});
	});
});
