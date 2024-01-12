const express = require("express");
const connectToDatabase = require("./config/database");
const configureExpress = require("./config/express");
const authRoutes = require("./routes/authRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const balanceRoutes = require("./routes/balanceRoutes");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

if (process.env.NODE_ENV === "test") {
}

connectToDatabase();

configureExpress(app);

app.use(cors());

app.use("/auth", authRoutes);
app.use("/payments", paymentRoutes);
app.use("/balance", balanceRoutes);

app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});

module.exports = app;
