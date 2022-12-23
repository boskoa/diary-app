const Sequelize = require("sequelize");
const DATABASE_URL = process.env.DATABASE_URL;

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
});

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to database");
  } catch (error) {
    console.log("Failed to connect to the database", error);
    return process.exit(1);
  }

  return null;
};

module.exports = {
  connectToDatabase,
};
