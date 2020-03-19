import { Category } from '../models'

const addCategory = (req, res) => {
    const category = req.body
    Category.create(category).then(document => {
        res.status(200).json(document)
    }).then(err => {
        res.send(err)
    })
}

const getCategories = (req, res) => {
    Category.find({}).then(categories => {
        res.status(200).json(categories)
    }).catch(err => res.status(401).send(err));
}

export default { addCategory, getCategories }