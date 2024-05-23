const { login } = require('../DB/Postgres');
const config = require('../config');
const { success, error } = require('../red/response');
const jwt = require('jsonwebtoken');


const signIn = (req, res) => {
    login(req.body.username, req.body.password)
        .then(response => {
            const { accessToken, refreshToken } = generateTokenAndSaveCookies(req, res, response.username)
            res.status(200).send({ isLogged: true, msg: "Login Successful", accessToken, refreshToken });
        })
        .catch(({ msg, status }) => error(req, res, msg, status));
};

const verifyUser = async (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        const renewed = await renewToken(req, res);
        if (renewed) {
            next();
        } else {
            return res.status(401).json({ valid: false, message: 'Unauthorized' });
        }
    } else {
        jwt.verify(accessToken, config.app.accessTokenKey, (err, decoded) => {
            if (err) {
                return res.status(401).json({ valid: false, message: 'Invalid Token' });
            } else {
                req.username = decoded.username;
                next();
            }
        });
    }
};

const renewToken = (req, res) => {
    return new Promise((resolve, reject) => {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            res.status(401).json({ valid: false, message: 'No Refresh Token' });
            resolve(false);
        } else {
            jwt.verify(refreshToken, config.app.refreshTokenKey, (err, decoded) => {
                if (err) {
                    res.status(401).json({ valid: false, message: 'Invalid Refresh Token' });
                    resolve(false);
                } else {
                    generateTokenAndSaveCookies(req, res, decoded.username);
                    resolve(true);
                }
            });
        }
    });
};

const generateTokenAndSaveCookies = (req, res, username) => {
    const accessToken = jwt.sign({ username: username }, config.app.accessTokenKey, {
        expiresIn: config.app.timeAccessTokenStr
    });
    const refreshToken = jwt.sign({ username: username }, config.app.refreshTokenKey, {
        expiresIn: config.app.timeRefreshTokenStr
    });

    res.cookie('accessToken', accessToken, {
        maxAge: config.app.timeAccessToken
    });

    res.cookie('refreshToken', refreshToken, {
        maxAge: config.app.timeRefreshToken,
        //httpOnly: true, // Security best practice
        secure: true, // Ensure cookies are only sent over HTTPS
        sameSite: 'Strict' // Prevent CSRF attacks
    });
    return { accessToken, refreshToken }
}

module.exports = {
    signIn,
    verifyUser
};
