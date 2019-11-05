import mongoose,{Schema} from 'mongoose'

export const CurrencyUnitSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    code:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        required:true
    }
})

export default mongoose.model('CurrencyUnit',CurrencyUnitSchema)