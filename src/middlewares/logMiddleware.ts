import { Request, Response, NextFunction } from 'express';
import chalk from 'chalk';

const routesMap = {
    POST: 'blue',
    GET: 'green',
    PATCH: 'yellow',
} as const; // 'as const' makes the values literal types

type RouteMethod = keyof typeof routesMap; // 'POST' | 'GET' | 'PATCH'

export function logMiddleware(req: Request, res: Response, next: NextFunction) {
    if ((req.method as RouteMethod) in routesMap) {
        const color = routesMap[req.method as RouteMethod];
        console.log(
            `[${chalk[color](`${req.method}`)}] ${chalk.bold.gray(
                new Date().toISOString().slice(11, 19)
            )} ${req.originalUrl}`
        );
    } else {
        console.log(
            `[${req.method}] ${chalk.bold.gray(new Date().toISOString().slice(11, 19))} ${req.originalUrl}`
        );
    }

    next();
}
