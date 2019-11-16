import CurrencyUnit from '../models/currency-unit'

const addCurrencyUnit = (req, res) => {
    CurrencyUnit.create(req.body).then(document => {
        res.status(200).json(document)
    }).catch(err => res.status(200).json(err))
}

const getCurrencyUnits = (req, res) => {
    CurrencyUnit.find({}).then(currencyUnits => {
        res.status(200).json(currencyUnits)
    }).catch(err => res.status(401).json(err))
}

export default { addCurrencyUnit, getCurrencyUnits }