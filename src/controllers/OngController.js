const generateUniqueId = require("../utils/generateUniqueId");
const connection = require("../database/connection");
const logger = require("../utils/logger");

module.exports = {
  async index(request, response) {
    logger.info("Request recebido orgs index");
    const ongs = await connection("ongs").select("*");
    return response.json(ongs);
  },

  async create(request, response) {
    logger.info("Request recebido orgs create");

    const { name, email, whatsapp, city, uf } = request.body;

    const id = generateUniqueId();

    await connection("ongs").insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    });
    logger.info("Request encerrado orgs create");

    return response.json({ id });
  },
};
