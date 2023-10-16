import express from 'express';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { admin, protectRoute } from '../middleware/authMiddleware.js';
import User from '../models/user.js';
 
const userRoutes = express.Router();

const genToken = (id) => {
    return jwt.sign({id}, process.env.Token_Secret, {expiresIn: '60d'});
};

const loginUser = asyncHandler(async (req, res) => {
    const {name, password} = req.body;
    const user = await User.findOne({name});

    if(user && user.is_admin && (await user.matchPasswords(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            is_admin: user.is_admin,
            email: user.email,
            token: genToken(user._id),
        })
    } else{
        res.status(401);
        throw new Error('Invalid Admin User Name or Password');
    }
});

const registerUser = asyncHandler(async (req, res) => {
    const {name,  email, password} = req.body;
    const userExists = await User.findOne({name});

    if(userExists){
        res.status(400);
        throw new Error('Admin already exists!');
    }

    const user = await User.create({
        name,
        email,
        password,
    })
    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            is_admin: user.is_admin,
        });
    }
    else {
        res.json(400);
        throw new Error ('Invalid User Data.');
    }
});

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

const deleteUSer = asyncHandler(async (req, res) =>{
    try {
        const user = await User.findByIdAndRemove(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(404);
        throw new Error("User could not be found!");
    }
});

userRoutes.route('/login').post(loginUser);
userRoutes.route('/register').post(registerUser);
userRoutes.route('/').get(protectRoute, admin, getUsers);
userRoutes.route('/:id').delete(protectRoute, admin, deleteUSer);

export default userRoutes;