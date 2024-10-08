const connection = require("../database/connection");
const logger = require("../utils/logger");

module.exports = {
  async create(request, response) {
    logger.info("Request session iniciada create");

    const { id } = request.body;

    const ong = await connection("ongs").where("id", id).select("name").first();

    if (!ong) {
      return response.status(400).json({ error: "No ONG found with this ID." });
    }
    logger.info("Request session finalizada create");

    return response.json(ong);
  },
};
