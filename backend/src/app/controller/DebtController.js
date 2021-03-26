
const DebtSchema = require("../schema/DebtSchema");
const _ = require("lodash");

class DebtController {
  async index(req, res) {
    let listDebt = await DebtSchema.find({}).populate("user");
    return res.json(listDebt);
  }
  async find(req, res) {
    const debt = await DebtSchema.findById(req.params.id).populate("user");
    if(debt) {
      return res.json(debt);
    }
    else {
      return res.sendStatus(404);
    }
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
  edit(req, res) {
    DebtSchema.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, debt) => {
      if(err) {
        console.log(err);
        return res.status(404).send('Debt not found');
      }
      return res.json(debt);
    });
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