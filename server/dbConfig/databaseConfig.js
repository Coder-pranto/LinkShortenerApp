const mongoose = require('mongoose');

const connectDatabase = async (dbUrl) => {
  try {
    const conn = await mongoose.connect(dbUrl);
    console.log(`MongoDB Connected : ${conn.connection.host}`.bgCyan);
  } catch (error) {
    console.log(
      `>Error while connecting to mongoDB : ${error.message}`.underline.red,
    );
    process.exit(1);
  }
};

module.exports = connectDatabase;