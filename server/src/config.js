const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    app: {
        port: process.env.PORT
    },
    postgres: {
        host: process.env.PG_HOST,
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        database: process.env.PG_DATABASE,
        port: process.env.PG_PORT,
    }
};
