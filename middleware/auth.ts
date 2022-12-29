import config from "config";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction} from "express";

export default function (req, res: Response, next: NextFunction) {
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send("Access denied. No token provided");

    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        next();
    } catch(err) {
        return res.status(400).send("Invalid token");
    }
}
