import "./WCComponents/WCUsersTable.js";
import "./WCComponents/WCModalDialog.js";
import "./WCComponents/WCUserDetail.js";

function main() {
  var app = document.getElementById("app");

  var usersTable = document.createElement("wc-users-table");
  var modal = document.createElement("wc-modal-dialog");

  app.appendChild(usersTable);
  app.appendChild(modal);
}

window.onload = main;
