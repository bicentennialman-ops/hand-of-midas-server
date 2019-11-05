import mongoose, {Schema} from 'mongoose'


export const WalletSchema = new Schema(
    {
        name:{
            type:String,
            required:true
        },
        type:{
            type:Number,
            required:true
        },
        avatar:{
            type:String,
            required:true,
            trim:true
        },
        userCreate:{
            type:Schema.Types.ObjectId,
            ref:'User'
        },
        users:[{
            user:{
                type:Schema.Types.ObjectId,
                ref:'User'
            },
            role:{
                type:String,
                required:true
            }        
        }],
        destination:{
            type:Number
        },
        createDate:{
            type:Date,
            default:Date.now,
            required:true
        },
        updateDate:{
            type:Date,
            default:Date.now,
            required:true
        }
    }
)


export default mongoose.model('Wallet',WalletSchema)