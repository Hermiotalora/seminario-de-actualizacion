export class WCUserDetail extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async setUserId(userId) {
    this.shadowRoot.innerHTML = "<p>Cargando detalles...</p>";
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
      const user = await res.json();

      const container = document.createElement("div");

      const name = document.createElement("h3");
      name.textContent = `${user.name} (${user.username})`;

      const email = document.createElement("p");
      email.innerHTML = `<b>Email:</b> ${user.email}`;

      const phone = document.createElement("p");
      phone.innerHTML = `<b>Teléfono:</b> ${user.phone}`;

      const website = document.createElement("p");
      website.innerHTML = `<b>Sitio Web:</b> ${user.website}`;

      const addressTitle = document.createElement("h4");
      addressTitle.textContent = "Dirección";

      const address = document.createElement("p");
      address.textContent = `${user.address.street}, ${user.address.suite}, ${user.address.city}`;

      const companyTitle = document.createElement("h4");
      companyTitle.textContent = "Empresa";

      const company = document.createElement("p");
      company.textContent = `${user.company.name} - ${user.company.catchPhrase}`;

      container.appendChild(name);
      container.appendChild(email);
      container.appendChild(phone);
      container.appendChild(website);
      container.appendChild(addressTitle);
      container.appendChild(address);
      container.appendChild(companyTitle);
      container.appendChild(company);

      this.shadowRoot.innerHTML = "";
      this.shadowRoot.appendChild(container);
    } catch (err) {
      this.shadowRoot.innerHTML = `<p>Error cargando detalle: ${err}</p>`;
    }
  }
}

customElements.define("wc-user-detail", WCUserDetail);
