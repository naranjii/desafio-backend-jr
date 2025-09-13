import { Request } from "express";
import { AuthTokenInterface } from "./AuthTokenInterface";

export interface TypedRequest<T> extends Request {
	body: T;
}

export interface AuthenticatedTypedRequest<T = undefined>
	extends TypedRequest<T> {
	user: AuthTokenInterface;
}
