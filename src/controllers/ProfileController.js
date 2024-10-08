const connection = require("../database/connection");
const logger = require("../utils/logger");

module.exports = {
  async index(request, response) {
    logger.info("Request recebido profile index");

    const ong_id = request.headers.authorization;

    const incidents = await connection("incidents")
      .where("ong_id", ong_id)
      .select("*");
    logger.info("Request processado profile index");

    return response.json(incidents);
  },
};
