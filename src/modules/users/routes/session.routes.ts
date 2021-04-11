import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';
import { celebrate, Joi, Segments } from 'celebrate';

const sessionRouter = Router();
const sessionsController = new SessionsController();

/**
 * Route Session
 * Type POST
 * Validate the values: name, pasword
 */
sessionRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsController.create,
);

export default sessionRouter;
