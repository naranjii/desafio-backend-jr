import { prisma } from "../../config/db";
import * as RequestService from "../../services/RequestService";
import { clearDB } from "../helpers";
import { describe, it, expect, beforeEach, afterAll } from "vitest";

describe("RequestService (unit)", () => {
	beforeEach(async () => {
		await clearDB();
	});

	afterAll(async () => {
		await clearDB();
		await prisma.$disconnect();
	});

	describe("createRequest", () => {
		it("creates a request with items and returns them", async () => {
			const user = await prisma.user.create({
				data: { name: "u", email: "u@example.com", password: "p" },
			});
			const req = await RequestService.createRequest(user.id, [
				{ name: "Item A", quantity: 2, price: 10.5 },
			]);
			expect(req).toHaveProperty("id");
			expect(req).toHaveProperty("userId", user.id);
			expect(req.items).toHaveLength(1);
			expect(req.items[0]).toMatchObject({
				name: "Item A",
				quantity: 2,
				price: 10.5,
			});
		});

		it("throws if items array is empty", async () => {
			const user = await prisma.user.create({
				data: { name: "u", email: "u@example.com", password: "p" },
			});
			await expect(RequestService.createRequest(user.id, [])).rejects.toThrow();
		});

		it("throws if any item has quantity <= 0", async () => {
			const user = await prisma.user.create({
				data: { name: "u", email: "u@example.com", password: "p" },
			});
			await expect(
				RequestService.createRequest(user.id, [
					{ name: "Item A", quantity: 0, price: 10.5 },
				]),
			).rejects.toThrow();
		});
	});

	describe("submitRequest", () => {
		it("submits a draft request", async () => {
			const user = await prisma.user.create({
				data: { name: "u", email: "u@example.com", password: "p" },
			});
			const req = await RequestService.createRequest(user.id, [
				{ name: "Item A", quantity: 2, price: 10.5 },
			]);
			const submitted = await RequestService.submitRequest(req.id, user.id);
			expect(submitted).toHaveProperty("status", "submitted");
		});

		it("throws if request is not draft", async () => {
			const user = await prisma.user.create({
				data: { name: "u", email: "u@example.com", password: "p" },
			});
			const req = await RequestService.createRequest(user.id, [
				{ name: "Item A", quantity: 2, price: 10.5 },
			]);
			await RequestService.submitRequest(req.id, user.id);
			await expect(
				RequestService.submitRequest(req.id, user.id),
			).rejects.toThrow();
		});
	});

	describe("update", () => {
		it("updates items of a request", async () => {
			const user = await prisma.user.create({
				data: { name: "u", email: "u@example.com", password: "p" },
			});
			const req = await RequestService.createRequest(user.id, [
				{ name: "Item A", quantity: 2, price: 10.5 },
			]);
			const updated = await RequestService.update(req.id, [
				{ name: "Item A", quantity: 3, price: 10.5 },
			]);
			expect(updated).toHaveProperty("id", req.id);
			expect(updated.items).toHaveLength(1);
			expect(updated.items[0]).toMatchObject({
				name: "Item A",
				quantity: 3,
				price: 10.5,
			});
		});

		it("throws if items array is empty", async () => {
			const user = await prisma.user.create({
				data: { name: "u", email: "u@example.com", password: "p" },
			});
			const req = await RequestService.createRequest(user.id, [
				{ name: "Item A", quantity: 2, price: 10.5 },
			]);
			await expect(RequestService.update(req.id, [])).rejects.toThrow();
		});

		it("throws if request not found", async () => {
			await expect(
				RequestService.update("non-existent-id", [
					{ name: "Item A", quantity: 2, price: 10.5 },
				]),
			).rejects.toThrow("Not Found");
		});

		it("throws if request is not draft", async () => {
			const user = await prisma.user.create({
				data: { name: "u", email: "u@example.com", password: "p" },
			});
			const req = await RequestService.createRequest(user.id, [
				{ name: "Item A", quantity: 2, price: 10.5 },
			]);
			await RequestService.submitRequest(req.id, user.id);
			await expect(
				RequestService.update(req.id, [
					{ name: "Item A", quantity: 3, price: 10.5 },
				]),
			).rejects.toThrow("Only draft requests can be updated.");
		});
	});

	describe("approveRequest", () => {
		it("approves a submitted request", async () => {
			const user = await prisma.user.create({
				data: { name: "u", email: "u@example.com", password: "p" },
			});
			const req = await RequestService.createRequest(user.id, [
				{ name: "Item A", quantity: 2, price: 10.5 },
			]);
			await RequestService.submitRequest(req.id, user.id);
			const approved = await RequestService.approveRequest(req.id, user.id);
			expect(approved).toHaveProperty("status", "approved");
		});

		it("throws if request is not submitted", async () => {
			const user = await prisma.user.create({
				data: { name: "u", email: "u@example.com", password: "p" },
			});
			const req = await RequestService.createRequest(user.id, [
				{ name: "Item A", quantity: 2, price: 10.5 },
			]);
			await expect(
				RequestService.approveRequest(req.id, user.id),
			).rejects.toThrow("Request must be a draft to be submitted.");
		});

		it("throws if request not found", async () => {
			const user = await prisma.user.create({
				data: { name: "u", email: "u@example.com", password: "p" },
			});
			await expect(
				RequestService.approveRequest("non-existent-id", user.id),
			).rejects.toThrow("Not Found");
		});
	});

	describe("rejectRequest", () => {
		it("rejects a submitted request", async () => {
			const user = await prisma.user.create({
				data: { name: "u", email: "u@example.com", password: "p" },
			});
			const req = await RequestService.createRequest(user.id, [
				{ name: "Item A", quantity: 2, price: 10.5 },
			]);
			await RequestService.submitRequest(req.id, user.id);
			const rejected = await RequestService.rejectRequest(req.id, user.id);
			expect(rejected).toHaveProperty("status", "rejected");
		});

		it("throws if request is not submitted", async () => {
			const user = await prisma.user.create({
				data: { name: "u", email: "u@example.com", password: "p" },
			});
			const req = await RequestService.createRequest(user.id, [
				{ name: "Item A", quantity: 2, price: 10.5 },
			]);
			await expect(
				RequestService.rejectRequest(req.id, user.id),
			).rejects.toThrow("Request must be a draft to be submitted.");
		});

		it("throws if request not found", async () => {
			const user = await prisma.user.create({
				data: { name: "u", email: "u@example.com", password: "p" },
			});
			await expect(
				RequestService.rejectRequest("non-existent-id", user.id),
			).rejects.toThrow("Not Found");
		});
	});

	describe("getAllRequests", () => {
		it("returns all requests", async () => {
			const user = await prisma.user.create({
				data: { name: "u", email: "u@example.com", password: "p" },
			});
			await RequestService.createRequest(user.id, [
				{ name: "Item A", quantity: 2, price: 10.5 },
			]);
			await RequestService.createRequest(user.id, [
				{ name: "Item B", quantity: 1, price: 5.0 },
			]);
			const all = await RequestService.getAllRequests();
			expect(Array.isArray(all)).toBe(true);
			expect(all.length).toBe(2);
			expect(all[0]).toHaveProperty("id");
			expect(all[1]).toHaveProperty("id");
		});
	});
});
