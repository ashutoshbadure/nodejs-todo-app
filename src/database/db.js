const mongoose = require("mongoose");

const DB_URI = process.env.DB_URI;

const connectToDB = async () => {
  try {
    await mongoose.connect(DB_URI).then(() => {
      console.log("Connected to db!");
    });
  } catch (error) {
    console.error("Error connecting DB!", error);
  }
};

module.exports = connectToDB;
