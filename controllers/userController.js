const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (id, name) => {
  return jwt.sign({ id, name }, process.env.SECRET_KEY, {
    expiresIn: "90d",
  });
};

exports.signUp = async (req, res) => {
  try {
    // Solution1:
    // const newUser = await User.create({
    //   name: req.body.name,
    //   email: req.body.email,
    //   password: req.body.password,
    //   confirmPassword: req.body.confirmPassword,
    // });
    // Solution2:
    // const { name, email, password, confirmPassword } = req.body;
    // const newUser = await User.create({name,email,password,confirmPassword});
    // Solution3:
    const newUser = await User.create({ ...req.body, role: "user" });
    res.status(201).json({
      message: "User created !!!!",
      data: { newUser },
    });
  } catch (error) {
    res.status(400).json({
      message: "Fail !!!!",
      error: error,
    });
  }
};

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "email and password are required !!!",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found !!!",
      });
    }
    if (!(await user.verifPassword(password, user.password))) {
      return res.status(403).json({
        message: "Password incorrect !!!",
      });
    }
    const token = createToken(user._id, user.name);
    res.status(200).json({
      message: "Logged in !!!",
      token: token,
    });
  } catch (error) {
    res.status(400).json({
      message: "Fail !!!!",
      error: error,
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({
      message: "User created !!!!",
      data: { newUser },
    });
  } catch (error) {
    res.status(400).json({
      message: "Fail !!!!",
      error: error,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).json({
      message: "User updated !!!!",
      data: { updatedUser },
    });
  } catch (error) {
    res.status(400).json({
      message: "Fail !!!!",
      error: error,
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: "Users Fetched !!!",
      nbr: users.length,
      data: { users },
    });
  } catch (error) {
    res.status(400).json({
      message: "Fail !!!!",
      error: error,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      message: "User Fetched !!!",
      data: { user },
    });
  } catch (error) {
    res.status(400).json({
      message: "Fail !!!!",
      error: error,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).json({
      message: "User Fetched !!!",
    });
  } catch (error) {
    res.status(400).json({
      message: "Fail !!!!",
      error: error,
    });
  }
};
