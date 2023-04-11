import express from 'express'
import UsersController from '../controller/userController'
import UserValidator from '../validator/validator'
import Middleware from '../middleware/middleware'
export const userRoutes = express.Router()

userRoutes.get(
  '/',
  Middleware.handleValidationError,
  UsersController.getAllUser,
)

userRoutes.get(
  '/:id',
  UserValidator.checkIdParam(),
  Middleware.handleValidationError,
  UsersController.getUserById,
)

userRoutes.post(
  '/',
  UserValidator.checkCreatedUser(),
  Middleware.handleValidationError,
  UsersController.createUser,
)

userRoutes.put(
  '/:id',
  UserValidator.checkIdParam(),
  UserValidator.checkUpdateddUser(),
  Middleware.handleValidationError,
  UsersController.updateUser,
)

userRoutes.delete(
  '/:id',
  UserValidator.checkIdParam(),
  Middleware.handleValidationError,
  UsersController.deleteById,
)
