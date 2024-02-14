import Joi from "joi";
import bcrypt from "bcrypt";
require('lodash');
import { User } from "../models/user";
import express, { Router, Request, Response} from "express";
const router: Router = express.Router()

router.post("/", async(req: Request, res: Response) => {
    const { error } = validateUser(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password");

    const validPassowrd = await bcrypt.compare(req.body.password, user.password);
    if (!validPassowrd) res.status(400).send("Invalid email or password");
    
    res.send({
        token: user.generateAuthToken(),
        authentication: "bearer"
    });
});

interface LoginBodyOfRequest {
    email: string;
    password: string
}


function validateUser(req: LoginBodyOfRequest) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).email().required(),
        password: Joi.string().min(8).max(1024).required()
    });

    return schema.validate(req);
}

export default router;