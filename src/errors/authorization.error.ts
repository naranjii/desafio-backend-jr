import { ApplicationError } from "./_app.error";

export class AuthorizationError extends ApplicationError {
    constructor(message: string) {
        super(message);
        this.code = "UNAUTHORIZED";
        this.name = "ApplicationError";
    }
}
