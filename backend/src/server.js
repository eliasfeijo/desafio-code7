const express = require("express");
const db = require("./database/config");
const mongoose = require("mongoose");
const _ = require("lodash")
const fetch = require("node-fetch");
const UserSchema = require("./app/schema/UserSchema");

class App {
  constructor() {
    this.express = express();

    this.database();
    this.middlewares();
    this.routes();

    this.express.listen(3001, () =>
      console.log(`Sua API REST está funcionando na porta 3001 `)
    );
  }

  database() {
    mongoose.connect(db.uri, { useNewUrlParser: true });
    this.bootstrapUsers();
  }

  middlewares() {
    this.express.use(express.json());
  }

  routes() {
    this.express.use(require("./routes"));
  }

  async bootstrapUsers() {
    let hasUsers = false;
    await UserSchema.find({}, async (err, users) => {
      if(err) {
        console.log(`Error fetching User document`, err);
      }
      if(users && users.length > 0) {
        hasUsers = true;
      }
    });
    if(!hasUsers) {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      console.log(response);
      if(!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      }
      const listUser = await response.json();
      console.log(listUser);
      _.forEach(listUser, user => {
        const newUser = new UserSchema(user);
        newUser.save();
      });
    }
  }
}
module.exports = new App().express;