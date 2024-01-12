const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const User = require("../models/user");

const register = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error("Erro de validação:", errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  console.log("Novo usuário a ser registrado:", username);

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    console.log("Usuário já existe:", username);
    return res.status(400).json({ error: "Usuário já existe" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();

  console.log("Usuário registrado com sucesso:", username);
  res.status(201).json({ message: "Usuário registrado com sucesso" });
});

const login = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error("Erro de validação:", errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  console.log("Usuário tentando fazer login:", username);

  const user = await User.findOne({ username });
  if (!user) {
    console.log("Usuário não encontrado:", username);
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    console.log("Senha inválida para o usuário:", username);
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  console.log("Login bem-sucedido. Token gerado para o usuário:", username);
  res.json({ token });
});

module.exports = { register, login };
