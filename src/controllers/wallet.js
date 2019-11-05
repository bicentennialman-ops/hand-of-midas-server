import Wallet from '../models/wallet'

const addWallet=(req,res)=>{
    const wallet=req.body
    Wallet.create(wallet).then(document=>{
        res.status(200).json(document)
    }).catch(err=>res.status(200).send(err))
}

const getWallet=(req,res)=>{
    Wallet.findById(req.body.id).populate('users.user','_id name email').then(document=>{
        res.status(200).json(document)
    }).catch(err=>res.status(200).send(err))
}

const getListWallets=(req,res)=>{
    Wallet.find({"users.user":req.user._id}).then(document=>{
        res.status(200).json(document)
    }).catch(err=>res.status(200).send(err))
}

export default {addWallet,getWallet,getListWallets} 