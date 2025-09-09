export class WCModalDialog extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // Fondo oscuro
    this.backdrop = document.createElement("div");
    Object.assign(this.backdrop.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "none",
      justifyContent: "center",
      alignItems: "center"
    });

    // Caja del modal
    this.dialog = document.createElement("div");
    Object.assign(this.dialog.style, {
      background: "white",
      padding: "20px",
      borderRadius: "8px",
      minWidth: "300px"
    });

    // Slot para insertar contenido
    this.slot = document.createElement("slot");

    // Botones
    this.btnAceptar = document.createElement("button");
    this.btnAceptar.textContent = "Aceptar";
    this.btnCancelar = document.createElement("button");
    this.btnCancelar.textContent = "Cancelar";

    const btns = document.createElement("div");
    Object.assign(btns.style, {
      marginTop: "15px",
      display: "flex",
      justifyContent: "flex-end",
      gap: "10px"
    });
    btns.append(this.btnCancelar, this.btnAceptar);

    this.dialog.append(this.slot, btns);
    this.backdrop.appendChild(this.dialog);
    this.shadowRoot.appendChild(this.backdrop);
  }

  connectedCallback() {
    this.btnCancelar.addEventListener("click", () => this.close("cancel"));
    this.btnAceptar.addEventListener("click", () => this.close("accept"));
  }

  disconnectedCallback() {
    this.btnCancelar.removeEventListener("click", () => {});
    this.btnAceptar.removeEventListener("click", () => {});
  }

  open() {
    this.backdrop.style.display = "flex";
  }

  close(action) {
    this.backdrop.style.display = "none";
    this.dispatchEvent(new CustomEvent("dialog-close", { detail: { action } }));
  }
}

customElements.define("wc-modal-dialog", WCModalDialog);
