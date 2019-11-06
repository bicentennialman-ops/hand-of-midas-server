
import Exchange from '../models/exchange'
import Wallet from '../models/wallet'
import Category from '../models/category'

const addExchange = (req, res) => {
    const exchange = req.body
    Wallet.findOne({ $and: [{ _id: exchange.wallet }, { "users.user": req.user._id }] }).populate("users.user").then(wallet => {
        if (!wallet)
            res.status(200).json({ message: "No find wallet." });
        else {
            const user = wallet.users.find(user => user.user._id.toString() == req.user._id)
            if ((user.role === 'root') || (user.role.indexOf('create')))
                Category.findOne({ _id: exchange.category }).then(category => {
                    if (!category)
                        res.status(200).json({ message: "No find category." });
                    else {
                        exchange.money = category.bias * exchange.money
                        exchange.userCreate = user._id
                        Exchange.create(exchange).then(document => {
                            res.status(200).json(document)
                        }).catch(err => res.status(200).json(err))
                    }
                }).catch(err => res.status(200).json(err));
            else res.status(403).json({ message: "You can't create exchange." })
        }
    }).catch(err => res.status(200).json(err))
}

const getListExchanges = (req, res) => {
    Wallet.findOne({ $and: [{ _id: req.body.wallet }, { "users.user": req.user._id }] }).then(wallet => {
        if (!wallet)
            res.status(200).json({ message: "No find wallet." });
        else {
            Exchange.find({ wallet: req.body.wallet }).populate("category").populate("userCreate","name email username").then(exchanges => {
                res.status(200).json(exchanges)
            }).catch(err => res.status(200).json(err))
        }
    }).catch(err => res.state(200).json(err))
}

export default { addExchange, getListExchanges }