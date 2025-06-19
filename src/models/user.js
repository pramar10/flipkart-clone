const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    has_password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    contactNumber: {
      type: String,
    },
    profilePicture: { type: String },
  },
  { timestamps: true }
);
userSchema.virtual('fullName').get(function () {
  `${this.firstName} ${this.lastName}`;
});
userSchema.virtual('password').set(function (password) {
  this.has_password = bcrypt.hashSync(password, 10);
});
userSchema.methods = {
  authenticate: function (password) {
    return bcrypt.compareSync(password, this.has_password);
  },
};
module.exports = mongoose.model('User', userSchema);
