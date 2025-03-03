const mongoose = require("mongoose");
const validator = require("validator");
const bctyptjs = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "The Name is required !!!"],
  },
  email: {
    type: String,
    required: [true, "The e-mail is required !!!"],
    unique: [true, "you must set a unused email !!!"],
    lowercase: true,
    validate: [validator.isEmail, "e-mail is not valid !!!"],
  },
  password: {
    type: String,
    required: [true, "The password is required !!!"],
    minlength: 8,
  },
  confirmPassword: {
    type: String,
    required: [true, "The password is required !!!"],
    minlength: 8,
    validate: {
      validator: function (cPass) {
        return cPass === this.password;
      },
      message: "passwords does not match !!!!",
    },
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  last_password_update: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.pre("save", async function (next) {
  // if password has changed
  if (this.isModified("password")) {
    this.password = await bctyptjs.hash(this.password, 12);
    this.confirmPassword = undefined;
    return next();
  }
  // if we does not change the pass
  return next();
});

userSchema.methods.isValid = async function (cryptedPass, userPass) {
  return await bctyptjs.compare(userPass, cryptedPass);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
