import { ApplicationError } from "./_app.error";

export class ConflictError extends ApplicationError {
    constructor(message: string) {
        super(message);
        this.code = "CONFLICT";
        this.name = "ConflictError";
    }
}
