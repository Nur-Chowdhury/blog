import express from 'express';
import asyncHandler from 'express-async-handler';
import Subs from '../models/subs.js';
 
const subsRoutes = express.Router();


const registerSubs = asyncHandler(async (req, res) => {
    const {email} = req.body;
    const subsExists = await Subs.findOne({email});

    if(subsExists){
        res.status(400);
        throw new Error('Subscriber already exists.');
    }

    const subs= await Subs.create({
        email,
    })
    if(subs) {
        res.status(201).json({
            _id: subs._id,
            email: subs.email,
        });
    }
    else {
        res.json(400);
        throw new Error ('Invalid Email.');
    }
})

subsRoutes.route('/subs').post(registerSubs);

export default subsRoutes;