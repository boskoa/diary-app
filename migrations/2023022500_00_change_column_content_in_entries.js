const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.changeColumn("entries", "content", {
      type: DataTypes.TEXT("long"),
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.changeColumn("entries", "content", {
      type: DataTypes.STRING,
    });
  },
};
