const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const balanceController = require("../controllers/balanceController");

router.post(
  "/",
  [
    body("name").notEmpty().withMessage("O campo 'name' é obrigatório"),
    body("initialAmount")
      .notEmpty()
      .withMessage("O campo 'initialAmount' é obrigatório")
      .isNumeric()
      .withMessage("O campo 'initialAmount' deve ser numérico"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    balanceController.createBalance(req, res);
  }
);

router.get("/", balanceController.getAllBalances);

router.get("/:id", balanceController.getBalanceById);

router.put(
  "/:id",
  [
    body("name").optional(),
    body("initialAmount")
      .optional()
      .isNumeric()
      .withMessage("O campo 'initialAmount' deve ser numérico"),
    body("remainingAmount")
      .optional()
      .isNumeric()
      .withMessage("O campo 'remainingAmount' deve ser numérico"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    balanceController.updateBalanceById(req, res);
  }
);

router.delete("/:id", balanceController.deleteBalanceById);

module.exports = router;
