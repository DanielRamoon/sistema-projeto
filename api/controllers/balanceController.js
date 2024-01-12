const Balance = require("../models/balance");

const createBalance = async (req, res) => {
  try {
    const userId = req.user;
    const { name, initialAmount } = req.body;

    console.log("Valor de 'initialAmount':", initialAmount);

    let existingBalance = await Balance.findOne({ user: userId, name });
    if (existingBalance) {
      return res
        .status(400)
        .json({ error: "Já existe um saldo com esse nome" });
    }

    const balance = new Balance({
      user: userId,
      name,
      initialAmount,
      remainingAmount: initialAmount,
    });

    await balance.save();
    res.status(201).json({ message: "Saldo criado com sucesso", balance });
  } catch (error) {
    console.error("Erro ao criar saldo:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const getAllBalances = async (req, res) => {
  try {
    const userId = req.user;
    const balances = await Balance.find({ user: userId });
    res.json({ balances });
  } catch (error) {
    console.error("Erro ao obter saldos:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const getBalanceById = async (req, res) => {
  try {
    const userId = req.user;
    const balanceId = req.params.id;

    const balance = await Balance.findOne({ _id: balanceId, user: userId });
    if (!balance) {
      return res.status(404).json({ error: "Saldo não encontrado" });
    }

    res.json({ balance });
  } catch (error) {
    console.error("Erro ao obter saldo:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const updateBalanceById = async (req, res) => {
  try {
    const userId = req.user;
    const balanceId = req.params.id;
    const { name, initialAmount, remainingAmount } = req.body;

    let balance = await Balance.findOne({ _id: balanceId, user: userId });
    if (!balance) {
      return res.status(404).json({ error: "Saldo não encontrado" });
    }

    const existingBalance = await Balance.findOne({
      user: userId,
      name,
      _id: { $ne: balanceId },
    });
    if (existingBalance) {
      return res
        .status(400)
        .json({ error: "Já existe um saldo com esse nome" });
    }

    balance.name = name;
    balance.initialAmount = initialAmount;
    balance.remainingAmount = remainingAmount;

    await balance.save();
    res.json({ message: "Saldo atualizado com sucesso", balance });
  } catch (error) {
    console.error("Erro ao atualizar saldo:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const deleteBalanceById = async (req, res) => {
  try {
    const userId = req.user;
    const balanceId = req.params.id;

    const balance = await Balance.findOne({ _id: balanceId, user: userId });
    if (!balance) {
      return res.status(404).json({ error: "Saldo não encontrado" });
    }

    await Balance.deleteOne({ _id: balanceId, user: userId });

    res.json({ message: "Saldo removido com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir saldo:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

module.exports = {
  createBalance,
  getAllBalances,
  getBalanceById,
  updateBalanceById,
  deleteBalanceById,
};
