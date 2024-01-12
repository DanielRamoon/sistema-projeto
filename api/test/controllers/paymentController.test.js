const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../index");
const Payment = require("../../models/payment");
const Balance = require("../../models/balance");

beforeEach(async () => {
  await Payment.deleteMany();
  await Balance.deleteMany();
});

describe("Testes para paymentController", () => {
  test("Deve criar um novo pagamento com sucesso", async () => {
    const user = "userId123";
    const balance = new Balance({ user, remainingAmount: 1000 });
    await balance.save();

    const paymentData = {
      amount: 500,
      description: "Pagamento de exemplo",
    };

    const response = await request(app)
      .post("/api/payments")
      .set("Authorization", `Bearer ${yourAuthToken}`)
      .send(paymentData);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Pagamento criado com sucesso");
    expect(response.body.payment.amount).toBe(paymentData.amount);
    expect(response.body.payment.description).toBe(paymentData.description);

    const updatedBalance = await Balance.findOne({ user });
    expect(updatedBalance.remainingAmount).toBe(500);
  });
});
