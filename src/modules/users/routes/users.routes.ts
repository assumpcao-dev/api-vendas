import { Router} from 'express'
import UsersController from '../controllers/UsersController'
import { celebrate, Joi, Segments} from 'celebrate'
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated'
import UsersAvatarController from '../controllers/UserAvatarController'
import multer from 'multer'
import uploadConfig from '@config/uploads'

const usersRouter = Router()
const usersController = new UsersController()
const usersAvatarController = new UsersAvatarController()
const upload = multer(uploadConfig)

/**
 * Route Users
 * Type GET
 */
usersRouter.get('/', isAuthenticated, usersController.index)
/**
 * Route Users
 * Type POST
 * Validate the values: name, email, password.
 */
usersRouter.post('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }
}), usersController.create)

/**
 * Route Update Avatar
 * Type PATCH
 * Only authorize update for authenticated users
 */
usersRouter.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  usersAvatarController.update
)


export default usersRouter
