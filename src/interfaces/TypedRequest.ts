import type { Request } from "express";
import type{ AuthTokenInterface } from "./AuthTokenInterface";

export interface TypedRequest<T> extends Request {
	body: T;
}

export interface AuthenticatedTypedRequest<T = undefined>
	extends TypedRequest<T> {
	user: AuthTokenInterface;
}
