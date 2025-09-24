export class WCModalDialog extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.container = document.createElement("div");
    this.container.classList.add("w3-modal");
    this.container.style.display = "none";

    const content = document.createElement("div");
    content.classList.add("w3-modal-content", "w3-animate-top", "w3-card-4");

    this.header = document.createElement("header");
    this.header.classList.add("w3-container", "w3-teal");
    this.header.innerHTML = `
      <span id="close" class="w3-button w3-display-topright">&times;</span>
      <h2>Detalle de Usuario</h2>
    `;

    this.body = document.createElement("div");
    this.body.classList.add("w3-container");
    this.body.innerHTML = "<p>Cargando...</p>";

    const footer = document.createElement("footer");
    footer.classList.add("w3-container", "w3-teal");
    footer.innerHTML = `<p>Unidad 4 - Actividad 5</p>`;

    content.appendChild(this.header);
    content.appendChild(this.body);
    content.appendChild(footer);

    this.container.appendChild(content);
    this.shadowRoot.appendChild(this.container);

    this.header.querySelector("#close").onclick = () => this.close();

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://www.w3schools.com/w3css/4/w3.css";
    this.shadowRoot.appendChild(link);
  }

  setContent(node) {
    this.body.innerHTML = "";
    this.body.appendChild(node);
  }

  open() {
    this.container.style.display = "block";
  }

  close() {
    this.container.style.display = "none";
  }
}

customElements.define("wc-modal-dialog", WCModalDialog);
