import { ApplicationError } from "./_app.error";

export class AuthenticationError extends ApplicationError {
    constructor(message: string) {
        super(message);
        this.code = "UNAUTHENTICATED";
        this.name = "AuthenticationError";
    }
}
