import Wallet from '../models/wallet'

const addWallet = (req, res) => {
    const wallet = req.body

    wallet.userCreate = req.user._id
    wallet.users = [{
        user: req.user._id,
        role: "root",
        alert: wallet.alert,
        incremental: wallet.incremental
    }]
    delete wallet.alert
    delete wallet.incremental
    Wallet.create(wallet).then(document => {
        res.status(200).json(document)
    }).catch(err => res.status(200).send(err))
}

const getWallet = (req, res) => {
    Wallet.findById(req.body.id).populate('users.user', '_id name email').then(document => {
        res.status(200).json(document)
    }).catch(err => res.status(200).send(err))
}

const getListWallets = (req, res) => {
    Wallet.find({ "users.user": req.user._id }).then(document => {
        res.status(200).json(document)
    }).catch(err => res.status(200).send(err))
}

export default { addWallet, getWallet, getListWallets } 