import { User } from '../models'
import config from '../config'
import jwt from 'jsonwebtoken'

const login = async (req, res) => {
    var { login, password } = req.body
    let user = await User.findOne({
        $or: [
            { email: login },
            { username: login }
        ]
    })
    if (!user)
        res.status(401).json({ message: "Password/user name incorrect" })
    else
        if (user.password === password) {
            var payload = { id: user.id, activeTime: Date.now().toString() }
            var token = jwt.sign(payload, config.security.jwtSecret, {
                expiresIn: 604800 // 1 week
            })
            User.updateOne({ _id: user.id }, { $set: { activeTime: payload.activeTime } }).then(() => {
                res.status(200).json({ message: 'ok', token: 'JWT ' + token })
            })

        } else {
            res.status(401).json({ message: "Password/user name incorrect" })
        }

    req.login(user, { session: false })
}

const renewToken = async (req, res) => {
    if (req.user != null) {
        var payload = { id: req.user.id, activeTime: Date.now() }
        var token = jwt.sign(payload, config.security.jwtSecret, {
            expiresIn: 604800
        })
        User.updateOne({ _id: payload.id }, { $set: { activeTime: payload.activeTime } }).then(() => {
            res.status(200).json({ massage: 'ok', token: 'JWT ' + token })
        }).catch(err => res.state(401).send(err))

    } else {
        res.status(401).json({ message: "Session end." })
    }
}
const register = (req, res) => {
    const { name, password, username, email } = req.body
    User.create({ name, password, username, email, status: 1 })
}

const getUserInfor = (req, res) => {
    if (!req.user)
        res.status(401).json({ message: "You didn't login." })
    else {
        const { username, email, name, _id } = req.user
        res.json({
            username, email, name, _id
        })
    }

}
export default { login, register, getUserInfor, renewToken }