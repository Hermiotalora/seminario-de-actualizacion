import "./WCComponents/WCUsersTable.js";

function main() {
  const usersTable = document.createElement("wc-users-table");
  document.body.appendChild(usersTable);
}

window.onload = main;
