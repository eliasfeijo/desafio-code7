
const DebtSchema = require("../schema/DebtSchema");

class DebtController {
  async index(req, res) {
    const listDebt = await DebtSchema.find({});
    return res.json(listDebt);
  }
  async create(req, res) {
    const debt = await DebtSchema.create(req.body);
    if(debt.id) {
      return res.json(debt);
    }
    else {
      return res.status(500).send('Could not create Debt');
    }

  }
  async edit(req, res) {
    const debt = await DebtSchema.findById(req.params.id);
    if(debt) {
      debt = new DebtSchema(debt);
      debt.save();
      return res.json(debt);
    }
    else {
      return res.status(404).send('Debt not found');

    }
  }
  async delete(req, res) {
    const debt = await DebtSchema.findByIdAndDelete(req.params.id, (err) => {
      if(err) {
        console.log(err);
        return res.sendStatus(500);
      }
      return res.sendStatus(200);
    });
  }
}

module.exports = new DebtController();