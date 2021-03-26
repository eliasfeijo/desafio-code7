
const express = require("express");
const DebtController = require("./app/controller/DebtController");
const UserController = require("./app/controller/UserController");
const routes = express.Router();

routes.get("/users", UserController.index);
routes.get("/users/:id", UserController.find);

routes.get("/debts", DebtController.index);
routes.get("/debts/:id", DebtController.find);
routes.post("/debts", DebtController.create);
routes.put("/debts/:id", DebtController.edit);
routes.delete("/debts/:id", DebtController.delete);

module.exports = routes;