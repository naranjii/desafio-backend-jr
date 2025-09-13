import { errorSerializer } from "./_handler";

export abstract class ApplicationError extends Error {
    code: keyof typeof errorSerializer;
    details?: any;

    constructor(message: string, details?: any) {
        super(message);
        this.code = "APP_ERROR";
        this.name = "ApplicationError";
        this.details = details;
    }
}
