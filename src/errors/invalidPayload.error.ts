import { ApplicationError } from "./_app.error";

export class InvalidPayloadError extends ApplicationError {
	constructor(message: string) {
		super(message);
		this.code = "INVALID_PAYLOAD";
		this.name = "InvalidPayloadError";
	}
}
