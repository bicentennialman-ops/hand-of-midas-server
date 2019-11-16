import mongoose, { Schema } from 'mongoose'

export const CurrencyUnitSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    character: {
        type: String,
        required: true
    },
    format: {
        type: String,
        required: true,
    },
    decimalSeparator: {
        type: String,
        required: true
    },
    groupingSeparator: {
        type: String,
        required: true
    }
})

export default mongoose.model('CurrencyUnit', CurrencyUnitSchema)