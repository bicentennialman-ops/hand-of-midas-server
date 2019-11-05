import CurrencyUnit from '../models/currency-unit'

const addCurrentUnit=(req,res)=>{
    CurrencyUnit.create(req.body).then(document=>{
        res.status(200).json(document)
    }).catch(err=>res.status(200).json(err))
}

export default {addCurrentUnit}