import request from "supertest";
import app from "../../app";
import { prisma } from "../../config/db";
import { clearDB } from "../helpers";

describe("Auth routes", () => {
	beforeEach(async () => {
		await clearDB();
	});

	afterAll(async () => {
		await clearDB();
		await prisma.$disconnect();
	});
	it("registra um usuário 'consultor'", async () => {
		const res = await request(app).post("/auth/register").send({
			name: "Consultant User",
			email: "supla@example.com",
			password: "123456",
		});

		expect(res.status).toBe(201);
		expect(res.body).toHaveProperty("id");
		expect(res.body).toHaveProperty("email", "supla@example.com");
		expect(res.body).toHaveProperty("role", "consultant");
	});
});
