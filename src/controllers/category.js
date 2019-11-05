import {Category} from '../models'

const addCategory=(req,res)=>{
    const category=req.body
    Category.create(category).then(document=>{
        res.status(200).json(document)
    }).then(err=>{
        res.send(err)
    })
}

export default {addCategory}