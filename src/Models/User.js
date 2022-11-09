const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { url } = require('../loaders/cloudinary');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: (v) => v.indexOf('@') != -1,
      message: (props) => `${props.value} não é um e-mail válido.`,
    },
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  lessons: {
    type: [
      {
        lessonID: {
          type: ObjectId,
          immutable: true,
        },
        courseID: {
          type: ObjectId,
          immutable: true,
        },
        module: {
          type: Number,
          required: true,
          immutable: true,
        },
        doneAt: {
          type: Date,
          default: () => Date.now(),
          immutable: true,
        },
      },
    ],
    default: [],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  admin: {
    type: Boolean,
    default: false,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});

UserSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;
});

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;
