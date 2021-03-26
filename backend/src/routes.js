
const express = require("express");
const DebtController = require("./app/controller/DebtController");
const routes = express.Router();

routes.get("/debts", DebtController.index);
routes.post("/debts", DebtController.create);

module.exports = routes;