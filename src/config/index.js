require('dotenv').config();

export default {
	env: process.env.NODE_ENV || 'development',
    server:{
        port: process.env.SERVER_PORT,
        url:process.env.SERVER_URL
    },
    database:{
        username:process.env.DB_USER_NAME,
        password:process.env.DB_PASSWORD,
        url:process.env.DB_URL 
    },
    security:{
        jwtSecret:"OKMEN"
    }
};