import mongoose from 'mongoose';

const subscriptionSchema = mongoose.Schema({  
    email: {
        type:String,
        required: true,
        unique: true,
    },
}, {timestamps: true}) 

subscriptionSchema.pre('save', async function (next) {
    if(!this.isModified('email')) {
        next();
    }
})

const Subscription = mongoose.model('Subscriptions', subscriptionSchema);

export default Subscription;