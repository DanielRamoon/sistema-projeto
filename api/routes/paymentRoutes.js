const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

// Criar um novo pagamento
router.post("/", paymentController.createPayment);

// Obter todos os pagamentos
router.get("/", paymentController.getPayments);

// Obter um pagamento por ID
router.get("/:id", paymentController.getPaymentById);

// Atualizar um pagamento
router.put("/:id", paymentController.updatePayment);

// Excluir um pagamento
router.delete("/:id", paymentController.deletePayment);

module.exports = router;
