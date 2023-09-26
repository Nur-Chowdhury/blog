import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const adminSchema = mongoose.Schema({ 
    name: {
        type: String,
        required: true,
        unique: true,
    },
    is_admin: {
        type:Boolean,
        required: true,
        default: false,
    },
    email: {
        type:String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
}, {timestamps: true}) 

adminSchema.methods.matchPasswords = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

adminSchema.pre('save', async function (next) {
    if(!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

const Admin = mongoose.model('admin', adminSchema)

export default Admin;