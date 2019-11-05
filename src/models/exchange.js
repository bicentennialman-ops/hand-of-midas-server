import mongoose,{Schema} from 'mongoose'

export const ExchangeSchema=new Schema(
    {
        money:{
            type:Number,
            required:true
        },
        category:{
            type:Schema.Types.ObjectId,
            ref:'Category'
        },
        wallet:{
            type:Schema.Types.ObjectId,
            ref:'Wallet'
        },
        note:{
            type:String
        },
        dateCreate:{
            type:Date,
            default:Date.now,
            required:true
        },
        withPerson:{
            name:{
                type:String,
                required:true
            },
            phoneNumber:{
                type:String
            },
            userAccount:{
                type:Schema.Types.ObjectId,
                ref:'User'
            }
        },
        date:{
            type:Date,
            default:Date.now,
            required:true
        },
        position:{
            name:{
                type:String
            },
            lat:{
                type:String
            },
            long:{
                type:String
            }
        }
    }   
)

export default mongoose.model('Exchange',ExchangeSchema)