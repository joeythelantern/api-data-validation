import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

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
