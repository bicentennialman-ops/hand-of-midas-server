import mongoose, { Schema } from 'mongoose'


export const UserSchema = new Schema(
    {
        email: {
            type: String,
            lowercase: true,
            trim: true,
            index: true,
            unique: true,
            required: true
        },
        username: {
            type: String,
            lowercase: true,
            trim: true,
            index: true,
            unique: true,
            required: true
        },
        phoneNumber: {
            type: String
        },
        password: {
            type: String,
            required: true,
            trim: true
        },
        name: {
            type: String,
            required: true
        },
        avatar: {
            type: String
        },
        facebookId: {
            type: String,
            unique: true
        },
        createDate: {
            type: Date,
            default: Date.now
        },
        updateDate: {
            type: Date,
            default: Date.now
        },
        status: {
            type: Number,
            required: true
        },
        activeTime: {
            type: String
        }
    }
)


export default mongoose.model('User', UserSchema)