require("dotenv").config();
require("colors");

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;
const SECRET_KEY = process.env.SECRET_KEY || "secret_dev";

const IS_TESTING = process.env.NODE_ENV === "test";

function getDatabaseUri() {
  const dbTestName = process.env.DATABASE_TEST_NAME || "technique_tracker_test";
  const dbProdName = process.env.DATABASE_NAME || "technique_tracker";
  const dbName = process.env.NODE_ENV === "test" ? dbTestName : dbProdName;
}

const BCRYPT_WORK_FACTOR = IS_TESTING ? 1 : 13;

console.log("Technique Log Setup Config".red);
console.log("PORT".blue, PORT);
console.log("SECRET_KEY".blue, SECRET_KEY);
console.log("IS_TESTING".blue, IS_TESTING);
console.log("BCRYPT_WORK_FACTOR".blue, BCRYPT_WORK_FACTOR);
console.log("Database".blue, getDatabaseUri());

module.exports = {
  PORT,
  SECRET_KEY,
  IS_TESTING,
  BCRYPT_WORK_FACTOR,
  getDatabaseUri,
};
