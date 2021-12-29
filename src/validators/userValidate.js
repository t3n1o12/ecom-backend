import { check, validationResult } from 'express-validator';

const validateSignupRequest = [
    check('firstName')
        .notEmpty()
        .withMessage('firstName is required'),
    check('lastName')
        .notEmpty()
        .withMessage('lastName is required'),
    check('lastName'),
    check('email')
        .isEmail()
        .withMessage('Valid Email is required'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 character long')
];

const validateSigninRequest = [
    check('email')
        .isEmail()
        .withMessage('Valid Email is required'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 character long')
];

const isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
        return res.status(400).json({ error: errors.array()[0].msg })
    }
    next();
}

export {
    validateSigninRequest,
    validateSignupRequest,
    isRequestValidated
}