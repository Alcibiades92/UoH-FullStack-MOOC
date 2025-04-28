const app = require("./app");
const config = require("./config/config");
const logger = require("./utils/logger.js");

const PORT = Number(config.PORT) || 3004;

app.listen(PORT, () => {
  logger.info(`App is running on ${config.PORT}`);
});
