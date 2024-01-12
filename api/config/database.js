const mongoose = require("mongoose");
require("dotenv").config();

const mongodbURI = process.env.MONGODB_URI;

const connectToDatabase = async () => {
  try {
    const connectOptions = {
      serverSelectionTimeoutMS: 5000,
    };

    await mongoose.connect(mongodbURI, connectOptions);
    console.log("Conectado ao MongoDB");
  } catch (error) {
    console.error("Erro na conexão com o MongoDB:", error);
    process.exit(1);
  }
};

module.exports = connectToDatabase;
