const { User } = require("./user");
const { Entry } = require("./entry");

User.hasMany(Entry);
Entry.belongsTo(User);

module.exports = { User, Entry };
