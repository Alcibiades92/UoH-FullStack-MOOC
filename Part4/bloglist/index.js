const app = require("./app");
const config = require("./config/config.js");
const logger = require("./utils/logger.js");

app.listen(3004, () => {
  logger.info(`App is running on ${3004}`);
});
