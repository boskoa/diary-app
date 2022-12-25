const Sequelize = require("sequelize");
const { SequelizeStorage, Umzug } = require("umzug");
const DATABASE_URL = process.env.DATABASE_URL;

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
});

const migrationsConf = {
  migrations: {
    glob: "migrations/*.js",
  },
  storage: new SequelizeStorage({
    sequelize,
    tableName: "migrations",
  }),
  context: sequelize.getQueryInterface(),
  logger: console,
};

const runMigrations = async () => {
  const migrator = new Umzug(migrationsConf);
  const migrations = await migrator.up();
  console.log("Migrations up to date", {
    files: migrations.map((m) => m.name),
  });
};

const rollbackMigrations = async () => {
  await sequelize.authenticate();
  const migrator = new Umzug(migrationsConf);
  await migrator.down();
};

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await runMigrations();
    console.log("Connected to database");
  } catch (error) {
    console.log("Failed to connect to the database", error);
    return process.exit(1);
  }

  return null;
};

module.exports = {
  connectToDatabase,
  sequelize,
  rollbackMigrations,
};
