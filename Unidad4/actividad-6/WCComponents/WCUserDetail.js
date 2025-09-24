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

      const title = document.createElement("h3");
      title.textContent = `${user.name} (${user.username})`;

      const email = document.createElement("p");
      email.innerHTML = `<b>Email:</b> ${user.email}`;

      const phone = document.createElement("p");
      phone.innerHTML = `<b>Teléfono:</b> ${user.phone}`;

      const website = document.createElement("p");
      website.innerHTML = `<b>Sitio Web:</b> ${user.website}`;

      const address = document.createElement("div");
      address.innerHTML = `<h4>Dirección</h4>
        <p>${user.address.street}, ${user.address.suite}, ${user.address.city}</p>`;

      const company = document.createElement("div");
      company.innerHTML = `<h4>Empresa</h4>
        <p>${user.company.name} - ${user.company.catchPhrase}</p>`;

      container.appendChild(title);
      container.appendChild(email);
      container.appendChild(phone);
      container.appendChild(website);
      container.appendChild(address);
      container.appendChild(company);

      this.shadowRoot.innerHTML = "";
      this.shadowRoot.appendChild(container);
    } catch (err) {
      this.shadowRoot.innerHTML = `<p>Error cargando detalle: ${err}</p>`;
    }
  }
}

customElements.define("wc-user-detail", WCUserDetail);
