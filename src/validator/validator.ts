import { body, param, query } from 'express-validator'

class UserValidator {
  checkCreatedUser() {
    return [
      body('id')
        .optional()
        .isInt()
        .withMessage(
          'The id should be number  - för att utan autoincrement autogenerera ID',
        ),
      body('firstName')
        .notEmpty()
        .withMessage('The  first namn value should not be empty'),
      body('lastName')
        .notEmpty()
        .withMessage('The last name  value should not be empty'),
      body('age')
        .notEmpty()
        .isNumeric()
        .withMessage('The age value should not be empty'),
      body('gender')
        .notEmpty()
        .withMessage('The gender value should not be empty'),
      body('email')
        .notEmpty()
        .isEmail()
        .withMessage(
          'The email value should not be empty and should be a valid value',
        ),
    ]
  }

  checkUpdateddUser() {
    return [
      body('id')
        .notEmpty()
        .isInt()
        .isNumeric()
        .withMessage('The id  value must be fill even when updating'),
      body('firstName')
        .notEmpty()
        .withMessage('The  first namn  value must be fill even when updating'),
      body('lastName')
        .notEmpty()
        .withMessage('The last name value must be fill even when updating'),
      body('age')
        .notEmpty()
        .isNumeric()
        .withMessage('The age  value must be fill even when updating'),
      body('gender')
        .notEmpty()
        .withMessage('The gender  value must be fill even when updating'),
      body('email')
        .notEmpty()
        .isEmail()
        .withMessage('The email  value must be fill even when updating'),
    ]
  }

  checkIdParam() {
    return [
      param('id')
        .notEmpty()
        .withMessage('The value should be not empty')
        .isInt()
        .withMessage('  the  id value should be  a nr'),
    ]
  }
}
export default new UserValidator()
