export class WCUsersTable extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const container = document.createElement("div");

    const button = document.createElement("button");
    button.textContent = "Efectuar Solicitud";
    button.classList.add("w3-button", "w3-green", "w3-margin-bottom");

    this.table = document.createElement("table");
    this.table.classList.add("w3-table", "w3-bordered", "w3-card-4", "w3-hoverable");

    button.addEventListener("click", () => this.hacerSolicitud());

    container.appendChild(button);
    container.appendChild(this.table);
    this.shadowRoot.appendChild(container);

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://www.w3schools.com/w3css/4/w3.css";
    this.shadowRoot.appendChild(link);
  }

  async hacerSolicitud() {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!response.ok) throw new Error("Error en la solicitud: " + response.status);

      const data = await response.json();
      this.renderTable(data);
    } catch (error) {
      this.table.innerHTML = `<tr><td>Error: ${error.message}</td></tr>`;
    }
  }

  renderTable(users) {
    this.table.innerHTML = "";

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    headerRow.classList.add("w3-blue");

    ["ID", "Usuario", "Nombre", "Correo", "Web", "Celular"].forEach(text => {
      const th = document.createElement("th");
      th.textContent = text;
      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    this.table.appendChild(thead);

    const tbody = document.createElement("tbody");
    users.forEach(u => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${u.id}</td>
        <td>${u.username}</td>
        <td>${u.name}</td>
        <td><span class="w3-tag w3-light-blue w3-round">${u.email}</span></td>
        <td>${u.website}</td>
        <td>${u.phone}</td>
      `;

      row.addEventListener("click", () => {
        const modal = document.querySelector("wc-modal-dialog");
        const detail = document.createElement("wc-user-detail");
        detail.setUserId(u.id);
        modal.setContent(detail);
        modal.open();
      });

      tbody.appendChild(row);
    });
    this.table.appendChild(tbody);
  }
}

customElements.define("wc-users-table", WCUsersTable);
