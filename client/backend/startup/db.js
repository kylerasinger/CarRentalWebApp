const mongoose = require("mongoose");
const config = require("config");

module.exports = async function() {
  const db = config.get("DB_CONN");
  
  try {
    await mongoose.connect(db, { useNewUrlParser: true });

    console.log(`Connected to ${db}...`);
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};
