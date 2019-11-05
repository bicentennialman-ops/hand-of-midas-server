import mongoose, {Schema} from 'mongoose'

export const CategorySchema = new Schema(
    {
        code:{
            type:String,
            required:true
        },
        type:{
            type:Number,//0: Dept&Loan   -1: expense  1: income
        },
        avatar:{
            type:String,
            required:true,
            trim:true
        },
        createDate:{
            type:Date,
            required:true,
            default:Date.now
        },
        user:{
            type:Schema.Types.ObjectId,
            ref:'User'
        },
        parent:{
            type:Schema.Types.ObjectId,
            ref:'Category'
        }
    }
)


export default mongoose.model('Category',CategorySchema)