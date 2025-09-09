export class WCContactForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const container = document.createElement("form");
    Object.assign(container.style, {
      display: "flex",
      flexDirection: "column",
      gap: "10px"
    });

    const name = document.createElement("input");
    name.type = "text";
    name.placeholder = "Nombre";

    const email = document.createElement("input");
    email.type = "email";
    email.placeholder = "Correo";

    const message = document.createElement("textarea");
    message.placeholder = "Mensaje";

    container.append(name, email, message);
    this.shadowRoot.appendChild(container);
  }
}

customElements.define("wc-contact-form", WCContactForm);
