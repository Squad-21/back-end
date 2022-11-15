const UserModel = require('../Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cloudinary = require('../loaders/cloudinary');
require('dotenv').config();

// TODO: MIDDLEWARE PARA O USUARIO LOGADO PODER EDITAR SOMENTE OS PROPRIOS DADOS

const generateToken = (user = {}) => {
  return jwt.sign({ id: user._id }, process.env.AUTH_SECRET, { expiresIn: 1209600 });
};

const uploadAvatar = async (image = File) => {
  const result = await cloudinary.uploader.upload(image, {
    folder: 'avatar',
    width: 300,
    crop: 'scale',
  });

  return {
    public_id: result.public_id,
    url: result.secure_url,
  };
};

class UserController {
  async register(req, res) {
    try {
      const user = await UserModel.create(req.body);

      return res.status(201).json({
        user,
        token: generateToken(user),
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
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
      return res.status(500).json({
        message: 'Erro ao recuperar usuários.',
        error: e.message,
      });
    }
  }

  async show(req, res) {
    const { id } = req.params;

    try {
      const user = await UserModel.findById(id);

      if (!user) return res.status(404).json({ message: 'Usuário não existe.' });

      return res.status(200).json(user);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: `Erro ao recuperar usuário.`,
        error: e.message,
      });
    }
  }

  async update(req, res) {
    const { id } = req.params;

    try {
      if (req.body.password) {
        const hash = await bcrypt.hash(req.body.password, 10);
        req.body.password = hash;
      }
      if (req.body.avatar) {
        const imageUploaded = await uploadAvatar(req.body.avatar);
        req.body.avatar = {
          public_id: imageUploaded.public_id,
          url: imageUploaded.url,
        };
      }

      const newUser = await UserModel.findByIdAndUpdate(id, req.body, {
        runValidators: true,
        returnDocument: 'after',
      });

      return res.status(200).json(newUser);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: 'Erro ao atualizar os dados do usuário.',
        error: e.message,
      });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    try {
      const deleted = await UserModel.findByIdAndDelete(id);

      if (!deleted) return res.status(404).json({ message: 'Usuário não existe.' });

      return res.status(200).json({ message: `Usuário ${deleted.name} removido com sucesso.` });
    } catch (e) {
      return res.status(500).json({
        message: 'Erro ao deletar usuário',
        error: e.message,
      });
    }
  }

  async authenticate(req, res) {
    const { email, password } = req.body;
    try {
      const user = await UserModel.findOne({ email }).select('+password');

      if (!user) return res.status(404).json({ message: 'Usuário não existe' });

      if (!(await bcrypt.compare(password, user.password))) return res.status(401).json({ message: 'Senha inválida' });

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
