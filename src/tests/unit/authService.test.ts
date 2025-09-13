import * as AuthService from "../../services/AuthService";
import { UserRepository } from "../../repositories/UserRepository";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { clearDB } from "../helpers";
import { prisma } from "../../config/db";

jest.mock("../../repositories/UserRepository");
jest.mock("bcryptjs", () => ({
	hash: jest.fn(),
	compare: jest.fn(),
}));

describe("AuthService", () => {
	beforeEach(async () => {
		await clearDB();
	});

	afterAll(async () => {
		await clearDB();
		await prisma.$disconnect();
		jest.clearAllMocks();
		jest.restoreAllMocks();
	});

	describe("register", () => {
		it("hashes password and creates user", async () => {
			(bcrypt.hash as jest.Mock).mockResolvedValue("hashed-pass");

			const repositoryMock = jest
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
			jest.spyOn(UserRepository, "findByEmail").mockResolvedValue({
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
			jest.spyOn(UserRepository, "findByEmail").mockResolvedValue({
				id: "uuid-123",
				email: "mat@test.com",
				password: "hashed",
				role: "consultant",
				name: "Supla",
			});

			(bcrypt.compare as jest.Mock).mockResolvedValue(true);

			const token = await AuthService.login("mat@test.com", "pass123");
			expect(bcrypt.compare).toHaveBeenCalledWith("pass123", "hashed");

			const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
			expect((decoded as any).id).toBe("uuid-123");
		});

		it("throws if user not found", async () => {
			jest.spyOn(UserRepository, "findByEmail").mockResolvedValue(null);

			await expect(
				AuthService.login("mat@test.com", "pass123"),
			).rejects.toThrow("User not found");
		});

		it("throws if password does not match", async () => {
			jest.spyOn(UserRepository, "findByEmail").mockResolvedValue({
				id: "uuid-123",
				email: "mat@test.com",
				password: "hashed",
				role: "consultant",
				name: "Supla",
			});

			(bcrypt.compare as jest.Mock).mockResolvedValue(false);

			await expect(
				AuthService.login("mat@test.com", "pass123"),
			).rejects.toThrow("Invalid email or password");
		});
	});
});
