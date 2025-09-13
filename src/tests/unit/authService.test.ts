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

    afterEach(() => {
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
                    password: "hashed-pass",
                });

            const user = await AuthService.register({ email: "mat@test.com", name: 'Mat', password: "pass123" });

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
                password: "hashed-pass",
            });
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

            const token = await AuthService.login("mat@test.com", "pass123")
            if (!token) {
                console.log("Token JWT ausente. Login falhou.")
            } else {
                console.log(`Token JWT retornado. Login sucedido. (JWT=${token.toString().slice(0, 20)}...)`)
            };

            expect(bcrypt.compare).toHaveBeenCalledWith("pass123", "hashed");

            const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
            expect((decoded as any).id).toBe("uuid-123");
        });

    });
    afterAll(async () => {
        await clearDB();
        await prisma.$disconnect();
    });
});
