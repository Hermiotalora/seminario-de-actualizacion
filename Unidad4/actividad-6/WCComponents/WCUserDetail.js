export class WCUserDetail extends HTMLElement {
constructor() {
    super();
    this.attachShadow({ mode: "open" });
}

setUser(user) {
    this.shadowRoot.innerHTML = "";

    var container = document.createElement("div");

    var name = document.createElement("h3");
    name.textContent = user.name + " (" + user.username + ")";

    var email = document.createElement("p");
    email.textContent = "Email: " + user.email;

    var phone = document.createElement("p");
    phone.textContent = "Teléfono: " + user.phone;

    var website = document.createElement("p");
    website.textContent = "Sitio Web: " + user.website;

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

    this.shadowRoot.appendChild(container);
}
}

customElements.define("wc-user-detail", WCUserDetail);
