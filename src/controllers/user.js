import {User} from '../models'
import config from '../config'
import jwt from 'jsonwebtoken'

const login = async(req,res)=>{
    var {login,password}=req.body
    let user = await User.findOne({
        $or:[
            {email:login},
            {username:login}
        ]
    })
    if (!user)
        res.status(401).json({message:"Password/user name incorrect"})
    else 
    if (user.password===password){
        var payload={id:user.id}
        var token = jwt.sign(payload,config.security.jwtSecret,{
            expiresIn: 604800 // 1 week
        })
        res.status(200).json({msg: 'ok',token:'JWT '+token})
    } else {
        res.status(401).json({message:"Password/user name incorrect"})
    } 
  
    req.login(user, { session : false })  
}

const register = (req,res)=>{
    const {name,password,username,email}=req.body
    User.create({name,password,username,email,status:1})
}

const getUserInfor = (req,res)=>{
   if (!req.user)
        res.status(401).json({message:"You didn't login."})
    else {
        const {username,email,name,id}=req.user
        res.json({
            username,email,name,id
        })
    }
   
}
export default {login,register,getUserInfor}