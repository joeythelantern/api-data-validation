import { Request, Response, NextFunction } from 'express';
import { Controller } from '../decorators/controller';
import { Route } from '../decorators/route';
import Joi from 'joi';
import { Validate } from '../decorators/validate';

type validation = {
    name: string;
    email?: string;
};

const postHealthCheckValidation = Joi.object<validation>({
    name: Joi.string().required(),
    email: Joi.string().email()
});

@Controller()
class MainController {
    @Route('get', '/healthcheck')
    getHealthCheck(req: Request, res: Response, next: NextFunction) {
        logging.info('Healthcheck called successfully!');
        return res.status(200).json({ hello: 'world!' });
    }

    @Route('post', '/healthcheck')
    @Validate(postHealthCheckValidation)
    postHealthCheck(req: Request, res: Response, next: NextFunction) {
        logging.info('Healthcheck called successfully!');
        return res.status(200).json({ ...req.body });
    }
}

export default MainController;
