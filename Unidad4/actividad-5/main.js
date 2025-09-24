import "./WCComponents/WCUsersTable.js";
import "./WCComponents/WCModalDialog.js";
import "./WCComponents/WCUserDetail.js";

function main() {
  const app = document.getElementById("app");

  const usersTable = document.createElement("wc-users-table");
  const modal = document.createElement("wc-modal-dialog");

  app.appendChild(usersTable);
  app.appendChild(modal);
}

window.onload = main;
