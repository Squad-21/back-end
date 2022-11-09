const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');
const UserModel = require('../Models/User');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  try {
    if (!authHeader) {
      return res.status(403).json({
        message: 'Não autorizado',
      });
    }

    const parts = authHeader.split(' ');
    const [schema, token] = parts;

    if (parts.length != 2 || schema.indexOf('Bearer') != 0) {
      return res.status(403).json({
        message: 'Token inválido',
      });
    }

    jwt.verify(token, authConfig.secret, async (error, decoded) => {
      if (error) {
        return res.status(403).json({
          message: 'Erro ao autenticar',
        });
      }

      const user = await UserModel.findById(decoded.id);

      if (!user.admin) {
        return res.status(403).json({
          message: 'Não autorizado',
        });
      }

      req.headers.user = decoded.id;

      return next();
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Erro ao autenticar',
      error: e,
    });
  }
};
