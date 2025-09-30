import { UserService } from "./models/UserService.js";
import { UserController } from "./controllers/UserController.js";

import "./WCComponents/WCUsersTable.js";
import "./WCComponents/WCModalDialog.js";
import "./WCComponents/WCUserDetail.js";

function main() {
  var app = document.getElementById("app");

  var usersTable = document.createElement("wc-users-table");
  var modal = document.createElement("wc-modal-dialog");

  app.appendChild(usersTable);
  app.appendChild(modal);

  var userService = new UserService();
  var controller = new UserController(userService, usersTable, modal);

  usersTable.setController(controller);
}

window.onload = main;
