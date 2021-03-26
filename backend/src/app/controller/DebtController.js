
const DebtSchema = require("../schema/DebtSchema");

class DebtController {
  async index(req, res) {
    const data = await DebtSchema.find({});

    return res.json(data);
  }
  async create(req, res) {
    const data = await DebtSchema.create(req.body);

    return res.json(data);
  }
}

module.exports = new DebtController();