import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

/**
 * This function will check any data in the body of the request and compare it to a given schema to ensure the data is valid.
 * @param schema The data validation schema to check req.body against.
 * @returns An express request handler you can insert as middleware.
 */
export function validate(schema: Joi.ObjectSchema) {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            await schema.validateAsync(req.body);
        } catch (error) {
            logging.error(error);

            return res.status(422).json(error);
        }

        next();
    };
}
