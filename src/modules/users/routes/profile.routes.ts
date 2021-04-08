import { Router} from 'express'
import { celebrate, Joi, Segments} from 'celebrate'
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated'
import ProfileController from '../controllers/ProfileController'

const profileRouter = Router()

const profileController = new ProfileController()
/**
 * Route Users
 * Type GET
 */
profileRouter.get('/', isAuthenticated, profileController.show)
/**
 * Route Users
 * Type POST
 * Validate the values: name, email, password.
 */
profileRouter.put('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().optional(),
    old_password: Joi.string(),
    password_confirmation: Joi.string().valid(Joi.ref('password'))
    .when('password', {
      is: Joi.exist(),
      then: Joi.required()
    })
  }
}), profileController.update)


export default profileRouter