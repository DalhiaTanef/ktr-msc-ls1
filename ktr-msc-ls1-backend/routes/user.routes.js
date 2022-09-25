const router = require("express").Router()
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const UserController = require("../controllers/user.controller")

const registerSchema = Joi.object({
    name: Joi.string().trim().required(),
    companyName: Joi.string().trim(),
    email: Joi.string().email().required(),
    /* regex for 10-digit phone numbers, with spaces, dot and dash as separators, otherwise no separators*/
    phoneNumber: Joi.string().regex(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/),
    /*  minimum 8 and maximum 15
        at least 1 uppercase
        at least 1 lowercase
        at least 1 number
        at least 1 special character among @$!%*?&
     */
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/).required()
})

const loginSchema = Joi.object({
    email: Joi.string().trim().required(),
    password: Joi.string().required()
})

const addCardSchema = Joi.object({
    userId: Joi.string().required(),
    name: Joi.string().trim().required(),
    companyName: Joi.string().trim(),
    email: Joi.string().email().required(),
    /* regex for 10-digit phone numbers, with spaces, dot and dash as separators, otherwise no separators*/
    phoneNumber: Joi.string().regex(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/),
    /*  minimum 8 and maximum 15
        at least 1 uppercase
        at least 1 lowercase
        at least 1 number
        at least 1 special character among @$!%*?&
     */
})

/**
 * POST: /api/v1/user/register
 * Purpose: Register a user
 */
router.post("/register", validator.body(registerSchema), UserController.register)

/**
 * POST: /api/v1/user/login
 * Purpose: Login a user
 */
router.post("/login", validator.body(loginSchema), UserController.login)

/**
 * PATCH: /api/v1/user/card
 * Purpose: add a card
 */
router.patch("/card", validator.body(addCardSchema), UserController.addCard)

/**
 * PATCH: /api/v1/user/cards
 * Purpose: get cards
 */
router.patch("/cards", UserController.getCards);

module.exports = router