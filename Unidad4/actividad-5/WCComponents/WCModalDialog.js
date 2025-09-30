export class WCModalDialog extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.container = document.createElement("div");
    this.container.classList.add("w3-modal");
    this.container.style.display = "none";

    var content = document.createElement("div");
    content.classList.add("w3-modal-content", "w3-animate-top", "w3-card-4");

    this.header = document.createElement("header");
    this.header.classList.add("w3-container", "w3-teal");

    var closeBtn = document.createElement("span");
    closeBtn.id = "close";
    closeBtn.classList.add("w3-button", "w3-display-topright");
    closeBtn.textContent = "×";
    var title = document.createElement("h2");
    title.textContent = "Detalle de Usuario";

    this.header.appendChild(closeBtn);
    this.header.appendChild(title);

    this.body = document.createElement("div");
    this.body.classList.add("w3-container");
    this.body.textContent = "Cargando...";

    var footer = document.createElement("footer");
    footer.classList.add("w3-container", "w3-teal");
    footer.textContent = "Unidad 4 - Actividad 5";

    content.appendChild(this.header);
    content.appendChild(this.body);
    content.appendChild(footer);

    this.container.appendChild(content);
    this.shadowRoot.appendChild(this.container);

    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://www.w3schools.com/w3css/4/w3.css";
    this.shadowRoot.appendChild(link);

    var self = this;
    closeBtn.onclick = function () {
      self.close();
    };
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
