import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const createToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
}

export const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

export const isTokenExpired = (token) => {
    const decoded = jwt.decode(token);

    if(decoded.exp < Date.now() / 1000){
        return true
    };
    return false
}