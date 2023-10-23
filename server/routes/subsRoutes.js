import express from 'express';
import asyncHandler from 'express-async-handler';
import { admin, protectRoute } from '../middleware/authMiddleware.js';
import Subscription from '../models/subs.js';
const subsRoutes = express.Router();

 
const Subscribe = asyncHandler(async (req, res) => {
    const {email} = req.body;
    const subsExists = await Subscription.findOne({email});

    if(subsExists){
        res.status(400).send('Subscriber Already Exists!');
    }
 
    const subs= await Subscription.create({
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

const getSubscribers = asyncHandler(async (req, res) => {
    const subscribers = await Subscription.find({});
    res.json(subscribers);
});

const deleteSubscriber = asyncHandler(async (req, res) =>{
    try {
        const subscriber = await Subscription.findByIdAndRemove(req.params.id);
        res.json(subscriber);
    } catch (error) {
        res.status(404);
        throw new Error("Subscriber could not be found!");
    }
}); 

 
subsRoutes.route('/').post(Subscribe);
subsRoutes.route('/').get(protectRoute, admin, getSubscribers);
subsRoutes.route('/:id').delete(protectRoute, admin, deleteSubscriber);

export default subsRoutes;