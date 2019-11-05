import express from 'express'
import config from './config'
import bodyParser from 'body-parser'
import connectDb from './models'
import User from './controllers/user'
import Category from './controllers/category'
import passport from 'passport'
import passportJWT from 'passport-jwt'
import {User as UserDB} from './models'

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var jwtOptions = {};

var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT');
jwtOptions.secretOrKey = config.security.jwtSecret;

var strategy = new JwtStrategy(jwtOptions, async (jwtPayload, next)=> {
  console.log('payload received', jwtPayload);
  const user = await UserDB.findById(jwtPayload.id)
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});
 
passport.use(strategy);

const app=express()

app.use('/public', express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(passport.initialize())

app.post('/api/register',User.register)
app.post('/api/login',User.login)
app.get('/api/getUserInfor',passport.authenticate('jwt', { session: false }),User.getUserInfor)

app.post('/api/addCategory',Category.addCategory)
const PORT = config.server.port;
 
connectDb().then(()=>{
  app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
  });
})
