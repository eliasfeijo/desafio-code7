
const UserSchema = require("../schema/UserSchema");

class UserController {
  async index(req, res) {
    const listUser = await UserSchema.find({});
    return res.json(listUser);
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