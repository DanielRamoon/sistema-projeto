const mongoose = require("mongoose");
const Payment = require("../models/payment");
const Balance = require("../models/balance");

const createPayment = async (req, res) => {
  try {
    const userId = req.user;
    const { user, amount, description } = req.body;

    const userBalance = await Balance.findOne({ user: userId });

    if (!userBalance || userBalance.remainingAmount < amount) {
      return res.status(400).json({ error: "Saldo insuficiente" });
    }

    const newPayment = new Payment({
      user,
      amount,
      description,
      balance: userBalance._id,
    });

    userBalance.remainingAmount -= amount;
    await userBalance.save();

    await newPayment.save();

    res
      .status(201)
      .json({ message: "Pagamento criado com sucesso", payment: newPayment });
  } catch (error) {
    console.error("Erro ao criar pagamento:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json({ payments });
  } catch (error) {
    console.error("Erro ao obter pagamentos:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const getPaymentById = async (req, res) => {
  try {
    const paymentId = req.params.id;
    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(404).json({ error: "Pagamento não encontrado" });
    }
    res.json({ payment });
  } catch (error) {
    console.error("Erro ao obter pagamento por ID:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const updatePayment = async (req, res) => {
  try {
    const paymentId = req.params.id;
    const { user, amount, description } = req.body;
    const updatedPayment = await Payment.findByIdAndUpdate(
      paymentId,
      { user, amount, description },
      { new: true }
    );
    if (!updatedPayment) {
      return res.status(404).json({ error: "Pagamento não encontrado" });
    }
    res.json({
      message: "Pagamento atualizado com sucesso",
      payment: updatedPayment,
    });
  } catch (error) {
    console.error("Erro ao atualizar pagamento:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const deletePayment = async (req, res) => {
  try {
    const paymentId = req.params.id;
    const deletedPayment = await Payment.findByIdAndDelete(paymentId);
    if (!deletedPayment) {
      return res.status(404).json({ error: "Pagamento não encontrado" });
    }

    res.json({
      message: "Pagamento excluído com sucesso",
      payment: deletedPayment,
    });
  } catch (error) {
    console.error("Erro ao excluir pagamento:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

module.exports = {
  createPayment,
  getPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
};
