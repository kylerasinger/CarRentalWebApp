const config = require("config");

module.exports = function() {
if (!config.get("DB_CONN")) {
    throw new Error("ERROR: DB_CONN is not defined.");
  }
};
