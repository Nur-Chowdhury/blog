import mongoose from 'mongoose';


const subscriberSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
}, {timestamps: true}); 

const subscriber = mongoose.model('user', subscriberSchema)

export default  subscriber;