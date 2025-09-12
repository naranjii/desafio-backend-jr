import request from "supertest";
import app from "../../app";
import { prisma } from "../../config/db";

describe("Purchase Request routes", () => {
    afterAll(async () => {
        await prisma.$disconnect();
    });
    it("cria uma requisição de compra", async () => {
        const userRes = await request(app)
            .post("/auth/register")
            .send({
                name: "Purchase Request User",
                email: "purchase-request@integrationtest.com"
                , password: "123456"
            });
        expect(userRes.status).toBe(201);
        const userId = userRes.body.id;
        const jwt = require('jsonwebtoken');
        const token = jwt.sign(userRes.body, process.env.JWT_SECRET || 'secret');
        const reqRes = await request(app)
            .post("/requests")
            .set("Authorization", `Bearer ${token}`)
            .send({
            });

        expect(reqRes.status).toBe(201);
        expect(reqRes.body).toHaveProperty("id");
        expect(reqRes.body).toHaveProperty("status", "draft");
        expect(reqRes.body).toHaveProperty("userId", userId);
    });
});
