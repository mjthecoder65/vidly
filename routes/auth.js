const config = require('config')
const jwt = require("jsonwebtoken");
const Joi = require('joi');
const bcrypt = require('bcrypt')
const _ = require('lodash');
const { User } = require("../models/user")
const express = require("express")
const router = express.Router()

router.post("/", async(req, res) => {
    const { error } = validateUser(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password");

    const validPassowrd = await bcrypt.compare(req.body.password, user.password);
    if (!validPassowrd) res.status(400).send("Invalid email or password");
    // const token = jwt.sign({_id: user._id}, config.get("jwtPrivateKey")); // TODO: Change this one.
    const token = user.generateAuthToken();
    res.send(token);
});

function validateUser(req) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).email().required(),
        password: Joi.string().min(8).max(1024).required() // TODO: Password Complexity: joi-password-complexity
    });

    return schema.validate(req);
}


module.exports = router;
