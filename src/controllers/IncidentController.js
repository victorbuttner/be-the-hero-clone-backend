const connection = require("../database/connection");

module.exports = {
  async index(request, response) {
    logger.info("Request incident profile index");

    const { page = 1 } = request.query;

    const [count] = await connection("incidents").count();

    const incidents = await connection("incidents")
      .join("ongs", "ongs.id", "=", "incidents.ong_id")
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        "incidents.*",
        "ongs.name",
        "ongs.email",
        "ongs.whatsapp",
        "ongs.city",
        "ongs.uf",
      ]);

    response.header("X-Total-Count", count["count(*)"]);
    logger.info("Request proecssada profile index");

    return response.json(incidents);
  },

  async create(request, response) {
    logger.info("Request incident profile create");

    const { title, description, value } = request.body;

    const ong_id = request.headers.authorization;

    const [id] = await connection("incidents").insert({
      title,
      description,
      value,
      ong_id,
    });
    logger.info("Request incident processada create");

    return response.json({ id });
  },

  async delete(request, response) {
    logger.info("Request incident iniciada delete");

    const { id } = request.params;
    const ong_id = request.headers.authorization;

    const incident = await connection("incidents")
      .where("id", id)
      .select("ong_id")
      .first();

    if (incident.ong_id !== ong_id) {
      return response.status(401).json({ error: "Operation not permitted." });
    }

    await connection("incidents").where("id", id).delete();
    logger.info("Request incident processada delete");

    return response.status(204).send();
  },
};
