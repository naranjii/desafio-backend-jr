import type { ApprovalStatus } from "../generated/prisma";
import type { RequestItemInterface } from "./RequestItemInterface";

export interface CreateRequestInterface {
	userId: string;
	requestItems: RequestItemInterface[];
}

export interface UpdateRequestInterface {
	id: string;
	requestItems: RequestItemInterface[];
}

export interface SubmitRequestInterface {
	id: string;
	userId: string;
}

export interface UpdateStatusInterface {
	userId: string;
	previousStatus: ApprovalStatus;
	id: string;
}
