import mongoose, { Schema } from 'mongoose'


export const WalletSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        type: {
            type: Number,//1 normal , 2 saving, 3 fund
            required: true
        },
        currencyUnit: {
            type: Schema.Types.ObjectId,
            ref: 'CurrencyUnit',
            required: true
        },
        avatar: {
            type: String,
            required: true,
            trim: true
        },
        userCreate: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        users: [{
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            role: {
                type: String,
                required: true
            },
            alert: {
                type: Boolean
            },
            incremental: {
                type: Boolean
            }
        }],
        destination: {
            type: Number
        },
        note: {
            type: Number
        },
        createDate: {
            type: Date,
            default: Date.now,
            required: true
        },
        updateDate: {
            type: Date,
            default: Date.now,
            required: true
        },
        starteDate: {
            type: Date,
            default: Date.now
        },
        endDate: {
            type: Date
        }
    }
)


export default mongoose.model('Wallet', WalletSchema)