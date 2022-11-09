const UserModel = require('../Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

const generateToken = (user = {}) => {
  return jwt.sign({ id: user._id }, authConfig.secret, { expiresIn: 86400 });
};

class UserController {
  async register(req, res) {
    try {
      const User = await UserModel.create(req.body);

      return res.status(201).json({
        User,
        token: generateToken(User),
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        message: `Erro ao criar usuário.`,
        error: e.message,
      });
    }
  }

  async index(req, res) {
    try {
      const users = await UserModel.find();

      return res.status(200).json({ users });
    } catch (e) {
      return res.status(500).json({ message: 'Erro ao recuperar usuários' });
    }
  }

  async show(req, res) {
    const { id } = req.params;

    try {
      const user = await UserModel.findById(id);

      if (!user) {
        return res.status(404).json({ message: 'Usuário não existe' });
      }

      return res.status(200).json(user);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: `Erro ao recuperar usuário.`,
      });
    }
  }

  async update(req, res) {
    const { id } = req.params;

    try {
      const hash = await bcrypt.hash(req.body.password, 10);
      req.body.password = hash;

      await UserModel.findByIdAndUpdate(id, req.body);

      return res.status(200).json({ message: 'Dados do usuário atualizado' });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: 'Falha ao atualizar dados do usuário' });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    try {
      const deleted = await UserModel.findByIdAndDelete(id);

      if (!deleted) {
        return res.status(404).json({ message: 'Usuário não existe' });
      }

      return res.status(200).json({ message: `Usuário ${deleted.name} deletado com sucesso` });
    } catch (e) {
      return res.status(500).json({ message: 'Falha ao deletar usuário' });
    }
  }

  async authenticate(req, res) {
    const { email, password } = req.body;
    try {
      const user = await UserModel.findOne({ email }).select('+password');

      if (!user) {
        return res.status(404).json({ message: 'Usuário não existe' });
      }

      if (!(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: 'Senha inválida' });
      }

      user.password = undefined;

      return res.status(200).json({
        user,
        token: generateToken(user),
      });
    } catch (e) {
      return res.status(500).json({
        message: `Erro ao autenticar usuário`,
        error: e.message,
      });
    }
  }
}

module.exports = new UserController();
