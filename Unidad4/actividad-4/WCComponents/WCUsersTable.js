export class WCUsersTable extends HTMLElement {
constructor() {
super();
  this.attachShadow({ mode: "open" });
}

  connectedCallback() {
    var container = document.createElement("div");

    this.button = document.createElement("button");
    this.button.textContent = "Efectuar Solicitud";
    this.button.classList.add("w3-button", "w3-green", "w3-margin-bottom");

    this.table = document.createElement("table");
    this.table.classList.add("w3-table", "w3-bordered", "w3-card-4", "w3-hoverable");

    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://www.w3schools.com/w3css/4/w3.css";

    container.appendChild(this.button);
    container.appendChild(this.table);

    this.shadowRoot.appendChild(link);
    this.shadowRoot.appendChild(container);

    this.button.onclick = this.hacerSolicitud.bind(this);
  }

  disconnectedCallback() {
    this.button.onclick = null;
  }

  async hacerSolicitud() {
    try {
      var response = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!response.ok) {
        throw new Error("Error en la solicitud: " + response.status);
      }
      var data = await response.json();
      this.renderTable(data);
    } catch (error) {
      this.table.textContent = "Error: " + error.message;
    }
  }

  renderTable(users) {
    while (this.table.firstChild) {
      this.table.removeChild(this.table.firstChild);
    }

    var thead = document.createElement("thead");
    var headerRow = document.createElement("tr");
    headerRow.classList.add("w3-blue");

    var headers = ["ID", "Usuario", "Nombre", "Correo", "Web", "Celular"];
    for (var i = 0; i < headers.length; i++) {
      var th = document.createElement("th");
      th.textContent = headers[i];
      headerRow.appendChild(th);
    }
    thead.appendChild(headerRow);
    this.table.appendChild(thead);

    var tbody = document.createElement("tbody");
    for (var j = 0; j < users.length; j++) {
      var u = users[j];
      var row = document.createElement("tr");

      var tdId = document.createElement("td");
      tdId.textContent = u.id;

      var tdUsername = document.createElement("td");
      tdUsername.textContent = u.username;

      var tdName = document.createElement("td");
      tdName.textContent = u.name;

      var tdEmail = document.createElement("td");
      var spanTag = document.createElement("span");
      spanTag.classList.add("w3-tag", "w3-light-blue", "w3-round");
      spanTag.textContent = u.email;
      tdEmail.appendChild(spanTag);

      var tdWeb = document.createElement("td");
      tdWeb.textContent = u.website;

      var tdPhone = document.createElement("td");
      tdPhone.textContent = u.phone;

      row.appendChild(tdId);
      row.appendChild(tdUsername);
      row.appendChild(tdName);
      row.appendChild(tdEmail);
      row.appendChild(tdWeb);
      row.appendChild(tdPhone);

      tbody.appendChild(row);
    }

    this.table.appendChild(tbody);
  }
}

customElements.define("wc-users-table", WCUsersTable);
