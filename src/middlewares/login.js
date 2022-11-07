const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json');
const UserModel = require('../Models/User');

module.exports = async(req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401).json({
            message: 'Não autorizado'
        })
    }

    const parts = authHeader.split(' ')
    const [schema, token] = parts

    if(parts.length != 2 || schema.indexOf('Bearer') != 0) {
        return res.status(401).json({
            message: 'Token inválido'
        })
    }

    jwt.verify(token, authConfig.secret, async(error,decoded) => {
        if(error) {
            console.log(error)
        }

        const user = await UserModel.findById(decoded.id)

        if(!user) {
            return res.status(401).json({
                message: 'Não autorizado'
            })
        }

        req.headers.user = decoded.id

        return next()
    })
}