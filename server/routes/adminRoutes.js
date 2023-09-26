import express from 'express';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import Admin from '../models/admin.js';
 
const adminRoutes = express.Router();

const genToken = (id) => {
    return jwt.sign({id}, process.env.Token_Secret, {expiresIn: '2h'});
};

const loginAdmin = asyncHandler(async (req, res) => {
    const {name, password} = req.body;
    const admin = await Admin.findOne({name});

    if(admin && admin.is_admin && (await admin.matchPasswords(password))) {
        res.json({
            _id: admin._id,
            name: admin.name,
            is_admin: admin.is_admin,
            email: admin.email,
            token: genToken(admin._id),
        })
    } else{
        res.status(401);
        throw new Error('Invalid Admin User Name or Password');
    }
});

const registerAdmin = asyncHandler(async (req, res) => {
    const {name,  email, password} = req.body;
    const adminExists = await Admin.findOne({name});

    if(adminExists){
        res.status(400);
        throw new Error('Admin already exists');
    }

    const admin = await Admin.create({
        name,
        email,
        password,
    })
    if(admin) {
        res.status(201).json({
            _id: admin._id,
            name: admin.name,
            email: admin.email,
            is_admin: admin.is_admin,
        });
    }
    else {
        res.json(400);
        throw new Error ('Invalid User Data.');
    }
})

adminRoutes.route('/login').post(loginAdmin);
adminRoutes.route('/register').post(registerAdmin);

export default adminRoutes;