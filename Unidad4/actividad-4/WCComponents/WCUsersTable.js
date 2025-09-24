export class WCUsersTable extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const container = document.createElement("div");

    // botón
    const button = document.createElement("button");
    button.textContent = "Efectuar Solicitud";
    button.classList.add("w3-button", "w3-green", "w3-margin-bottom");

    // tabla vacía al inicio
    this.table = document.createElement("table");
    this.table.classList.add("w3-table", "w3-bordered", "w3-card-4", "w3-hoverable");

    button.addEventListener("click", () => this.hacerSolicitud());

    container.appendChild(button);
    container.appendChild(this.table);
    this.shadowRoot.appendChild(container);

    // estilos W3.CSS
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

    // encabezado
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

    // cuerpo
    const tbody = document.createElement("tbody");
    users.forEach(u => {
      const row = document.createElement("tr");

      const tdId = document.createElement("td"); tdId.textContent = u.id;
      const tdUsername = document.createElement("td"); tdUsername.textContent = u.username;
      const tdName = document.createElement("td"); tdName.textContent = u.name;

      // correo como "tag"
      const tdEmail = document.createElement("td");
      const spanTag = document.createElement("span");
      spanTag.classList.add("w3-tag", "w3-light-blue", "w3-round");
      spanTag.textContent = u.email;
      tdEmail.appendChild(spanTag);

      const tdWeb = document.createElement("td"); tdWeb.textContent = u.website;
      const tdPhone = document.createElement("td"); tdPhone.textContent = u.phone;

      row.appendChild(tdId);
      row.appendChild(tdUsername);
      row.appendChild(tdName);
      row.appendChild(tdEmail);
      row.appendChild(tdWeb);
      row.appendChild(tdPhone);

      tbody.appendChild(row);
    });
    this.table.appendChild(tbody);
  }
}

customElements.define("wc-users-table", WCUsersTable);
