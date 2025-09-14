import { prisma } from "../config/db";
import { ApprovalStatus } from "../generated/prisma";
import type {
	CreateRequestInterface,
	SubmitRequestInterface,
	UpdateRequestInterface,
	UpdateStatusInterface,
} from "../interfaces/RequestInterface";

export const RequestRepository = {
	async create({ userId, requestItems }: CreateRequestInterface) {
		return prisma.purchaseRequest.create({
			data: {
				userId,
				status: ApprovalStatus.draft,
				history: {
					create: {
						toStatus: ApprovalStatus.draft,
						performedById: userId,
					},
				},
				items: { createMany: { data: requestItems } },
			},
			include: {
				items: true,
			},
		});
	},
	async submit(data: SubmitRequestInterface) {
		return prisma.purchaseRequest.update({
			where: { id: data.id },
			data: {
				status: ApprovalStatus.submitted,
				history: {
					create: {
						toStatus: ApprovalStatus.submitted,
						fromStatus: ApprovalStatus.draft,
						performedById: data.userId,
					},
				},
			},
		});
	},
	async getAll() {
		return prisma.purchaseRequest.findMany();
	},
	async getById(id: string) {
		return prisma.purchaseRequest.findUnique({ where: { id } });
	},
	async getGroupedListByStatus() {
		return prisma.purchaseRequest.groupBy({
			by: ["status"],
			_count: { status: true },
		});
	},
	async reject(data: UpdateStatusInterface) {
		return prisma.purchaseRequest.update({
			where: { id: data.id },
			data: {
				status: ApprovalStatus.rejected,
				history: {
					create: {
						fromStatus: data.previousStatus,
						toStatus: ApprovalStatus.rejected,
						performedById: data.userId,
					},
				},
			},
		});
	},
	async approve(data: UpdateStatusInterface) {
		return prisma.purchaseRequest.update({
			where: { id: data.id },
			data: {
				status: ApprovalStatus.approved,
				history: {
					create: {
						fromStatus: data.previousStatus,
						toStatus: ApprovalStatus.approved,
						performedById: data.userId,
					},
				},
			},
		});
	},

	async patchItems({ id, requestItems }: UpdateRequestInterface) {
		return prisma.$transaction(async (tx) => {
			await tx.requestItem.deleteMany({ where: { requestId: id } });
			await tx.requestItem.createMany({
				data: requestItems.map((item) => ({ ...item, requestId: id })),
			});
			return tx.purchaseRequest.findUnique({
				where: { id },
				include: { items: true },
			});
		});
	},

	async getByIdWithDetails(id: string){
		return prisma.purchaseRequest.findUnique({
			where: {id},
			include: {
				items: true,
				history: true
			}
		})
	}
};
