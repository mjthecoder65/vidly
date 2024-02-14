const config = require('config');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')
import bcrypt from "bcrypt";
const _ = require('lodash');
import _ from "lodash"
import { User, validateUser } from "../models/user";
import auth from "../middleware/auth";
import express, { Router, Request, Response} from "express";
const router: Router = express.Router()


router.get("/me", auth, async (req , res: Response) => {
    const id = req.user._id
    const user = await User.findById(id).select("-password");
    res.send(user);
});


router.post("/", async(req, res) => {
    const { error } = validateUser(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered");

    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    // Information Expert Principle
    // const token = jwt.sign({_id: user._id}, config.get("jwtPrivateKey"));
    const token = user.generateAuthToken();

    res.header('x-auth', token).send( _.pick(user, ['_id', 'name', 'email']))

});

export default router;
