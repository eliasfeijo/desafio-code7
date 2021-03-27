
const DebtSchema = require("../schema/DebtSchema");
const UserSchema = require("../schema/UserSchema");
const _ = require('lodash');
class UserController {
  async index(req, res) {
    const listUser = await UserSchema.find({});
    const jsonListUser = JSON.parse(JSON.stringify(listUser))
    await Promise.all(
      jsonListUser.map(async (user, index) => {
        const listDebt = await DebtSchema.find({ user: user._id });
        user.listDebt = listDebt;
        let debtTotal = 0;
        listDebt.map((debt, index) => {
          debtTotal += debt.value;
        });
        user.debtTotal = debtTotal;
      })
    );
    return res.end(JSON.stringify(jsonListUser));
  }
  async find(req, res) {
    const user = await UserSchema.findById(req.params.id);
    if(user) {
      return res.json(user);
    }
    else {
      return res.sendStatus(404);
    }
  }
}

module.exports = new UserController();