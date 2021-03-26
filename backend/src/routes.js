
const express = require("express");
const DebtController = require("./app/controller/DebtController");
const routes = express.Router();

routes.get("/debts", DebtController.index);
routes.get("/debts/:id", DebtController.index);
routes.post("/debts", DebtController.create);
routes.put("/debts/:id", DebtController.edit);
routes.delete("/debts/:id", DebtController.delete);

module.exports = routes;