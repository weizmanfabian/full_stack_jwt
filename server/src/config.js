const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    app: {
        port: process.env.PORT,

        accessTokenKey: process.env.ACCESS_TOKEN_KEY,
        timeAccessToken: process.env.TIME_ACCESS_TOKEN,
        timeAccessTokenStr: process.env.TIME_ACCESS_TOKEN_STR,

        refreshTokenKey: process.env.REFRESH_TOKEN_KEY,
        timeRefreshToken: process.env.TIME_REFRESH_TOKEN,
        timeRefreshTokenStr: process.env.TIME_REFRESH_TOKEN_STR
    },
    postgres: {
        host: process.env.PG_HOST,
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        database: process.env.PG_DATABASE,
        port: process.env.PG_PORT,
    }
};
