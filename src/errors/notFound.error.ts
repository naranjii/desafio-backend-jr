import { ApplicationError } from "./_app.error";

export class NotFoundError extends ApplicationError {
	constructor(message: string) {
		super(message);
		this.code = "NOT_FOUND";
		this.name = "NotFoundError";
	}
}
