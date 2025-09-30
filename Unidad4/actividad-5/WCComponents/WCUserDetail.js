export class WCUserDetail extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async setUserId(userId) {
    this.shadowRoot.innerHTML = "Cargando detalles...";

    try {
      var res = await fetch("https://jsonplaceholder.typicode.com/users/" + userId);
      var user = await res.json();

      var container = document.createElement("div");

      var name = document.createElement("h3");
      name.textContent = user.name + " (" + user.username + ")";

      var email = document.createElement("p");
      email.innerHTML = "<b>Email:</b> " + user.email;

      var phone = document.createElement("p");
      phone.innerHTML = "<b>Teléfono:</b> " + user.phone;

      var website = document.createElement("p");
      website.innerHTML = "<b>Sitio Web:</b> " + user.website;

      var addressTitle = document.createElement("h4");
      addressTitle.textContent = "Dirección";

      var address = document.createElement("p");
      address.textContent = user.address.street + ", " + user.address.suite + ", " + user.address.city;

      var companyTitle = document.createElement("h4");
      companyTitle.textContent = "Empresa";

      var company = document.createElement("p");
      company.textContent = user.company.name + " - " + user.company.catchPhrase;

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
      this.shadowRoot.innerHTML = "<p>Error cargando detalle: " + err.message + "</p>";
    }
  }
}

customElements.define("wc-user-detail", WCUserDetail);
