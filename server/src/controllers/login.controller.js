const { login } = require('../DB/Postgres');
const { success, error } = require('../red/response');
const jwt = require('jsonwebtoken')


const singIn = (req, res) => {
    login(req.body.username, req.body.password)
        .then(response => {
            const token = jwt.sign(response, "Stack", {
                expiresIn: '1m'
            })
            res.send({token})
        })
        .catch(({msg, status}) => error(req, res, msg, status))
}

module.exports = {
    singIn
}