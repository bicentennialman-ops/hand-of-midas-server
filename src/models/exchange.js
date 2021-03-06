import mongoose, { Schema } from 'mongoose'

export const ExchangeSchema = new Schema(
    {
        money: {
            type: Number,
            required: true
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category'
        },
        wallet: {
            type: Schema.Types.ObjectId,
            ref: 'Wallet'
        },
        note: {
            type: String
        },
        userCreate: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        dateCreate: {
            type: Date,
            default: Date.now,
            required: true
        },
        withPerson: {
            name: {
                type: String
            },
            phoneNumber: {
                type: String
            },
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        },
        date: {
            type: Date,
            default: Date.now,
            required: true
        },
        position: {
            name: {
                type: String
            },
            lat: {
                type: String
            },
            long: {
                type: String
            }
        },
        images: [{
            type: String
        }]
    }
)

export default mongoose.model('Exchange', ExchangeSchema)