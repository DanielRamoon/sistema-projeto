const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { register, login } = require("../../controllers/authController");
const User = require("../../models/user");

jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("../../models/user.js");

describe("Testes para authController", () => {
  describe("Testes para register", () => {
    test("Deve registrar um novo usuário com sucesso", async () => {});
  });

  describe("Testes para login", () => {
    test("Deve fazer login com sucesso", async () => {
      User.findOne.mockResolvedValue({
        _id: "userId123",
        username: "usuarioexistente",
        password: "hashedPassword",
      });
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue("tokenGerado");

      const req = {
        body: {
          username: "usuarioexistente",
          password: "senha123",
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await login(req, res);

      expect(User.findOne).toHaveBeenCalledWith({
        username: "usuarioexistente",
      });
      expect(bcrypt.compare).toHaveBeenCalledWith("senha123", "hashedPassword");
      expect(jwt.sign).toHaveBeenCalledWith(
        { userId: "userId123" },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      expect(res.json).toHaveBeenCalledWith({ token: "tokenGerado" });
    });
  });
});
