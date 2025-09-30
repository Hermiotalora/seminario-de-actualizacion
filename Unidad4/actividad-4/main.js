import "./WCComponents/WCUsersTable.js";

function main() {
  var usersTable = document.createElement("wc-users-table");
  document.body.appendChild(usersTable);
}

window.onload = main;
