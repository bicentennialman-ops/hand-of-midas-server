import mongoose from 'mongoose';
import User from './user';
import Category from './category'
import Wallet from './wallet'
import config from '../config'

const connectDb = () => {
  return mongoose.connect(
      `mongodb://${config.database.username}:${config.database.password}@${config.database.url}`,
      { useNewUrlParser: true , useUnifiedTopology: true}
      );
};

export { User,Category,Wallet};
export default connectDb 
