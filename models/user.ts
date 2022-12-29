import Joi from "joi"
import jwt from "jsonwebtoken";
import config from "config"
import { Schema, model, Model } from "mongoose";


interface IUser {
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
}


interface IUserMethods {
    generateAuthToken(): string;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema  = new Schema<IUser, UserModel, IUserMethods>({
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50,
        trim: true,
        get: value => value.trim(),
        set: value => value.trim(),
    },
    email: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 255,
        unique: true,
        trim: true,
    },

    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 1024,
    },
    isAdmin: Boolean
})

userSchema.method("generateAuthToken",  function() {
    const token =  jwt.sign({_id: this._id, isAdmin: this.isAdmin }, config.get("jwtPrivateKey"))
    return token;
})

const User = model<IUser, UserModel>("User", userSchema);


function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).email().required(),
        password: Joi.string().min(8).max(1024).required() // TODO: Password Complexity: joi-password-complexity
    });

    return schema.validate(user);
}

export { User, validateUser }

