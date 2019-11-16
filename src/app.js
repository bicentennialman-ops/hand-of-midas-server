import express from 'express'
import config from './config'
import bodyParser from 'body-parser'
import connectDb from './models'
import User from './controllers/user'
import Wallet from './controllers/wallet'
import Exchange from './controllers/exchange'
import Category from './controllers/category'
import UploadFile from './controllers/upload-file'
import CurrencyUnit from './controllers/currency-unit'
import passport from 'passport'
import passportJWT from 'passport-jwt'
import { User as UserDB } from './models'

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var jwtOptions = {};

var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT');
jwtOptions.secretOrKey = config.security.jwtSecret;

var strategy = new JwtStrategy(jwtOptions, async (jwtPayload, next) => {
  const user = await UserDB.findOne({ _id: jwtPayload.id, activeTime: jwtPayload.activeTime })
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

passport.use(strategy);

const app = express()

app.use('/public', express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(passport.initialize())

app.post('/api/register', User.register)
app.post('/api/login', User.login)
app.get('/api/renewToken', passport.authenticate('jwt', { session: false }), User.renewToken)
app.get('/api/getUserInfor', passport.authenticate('jwt', { session: false }), User.getUserInfor)

app.post('/api/addCategory', passport.authenticate('jwt', { session: false }), Category.addCategory)

app.post('/api/addCurrencyUnit', CurrencyUnit.addCurrencyUnit)
app.get('/api/getCurrencyUnits', CurrencyUnit.getCurrencyUnits)

app.post('/api/addWallet', Wallet.addWallet)
app.get('/api/getWallet', Wallet.getWallet)
app.get('/api/getListWallets', passport.authenticate('jwt', { session: false }), Wallet.getListWallets)

app.post('/api/addExchange', passport.authenticate('jwt', { session: false }), Exchange.addExchange)
app.get('/api/getListExchanges', passport.authenticate('jwt', { session: false }), Exchange.getListExchanges)
app.post('/api/uploadImagesExchange', UploadFile.uploadImagesExchangeMulter.array("images", 12), UploadFile.uploadImagesExchange)

const PORT = config.server.port;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
  });
})
