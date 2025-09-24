import "./WCComponents/WCUsersTable.js";
import "./WCComponents/WCModalDialog.js";
import "./WCComponents/WCUserDetail.js";

function main() {
  const table = document.createElement("wc-users-table");
  const modal = document.createElement("wc-modal-dialog");

  document.body.appendChild(table);
  document.body.appendChild(modal);

  console.log("Aplicación iniciada correctamente.");
}

window.onload = main;
