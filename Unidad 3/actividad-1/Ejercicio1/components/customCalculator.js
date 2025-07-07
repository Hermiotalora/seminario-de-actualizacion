export class CustomCalculator extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = `
      .wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 8px;
        width: max-content;
        font-family: Arial, sans-serif;
      }

      .display {
        width: 240px;
        height: 40px;
        font-size: 24px;
        text-align: right;
        margin-bottom: 10px;
        padding-right: 10px;
      }

      .buttons {
        display: grid;
        grid-template-columns: repeat(4, 60px);
        gap: 10px;
      }

      button {
        padding: 10px;
        font-size: 18px;
        cursor: pointer;
      }

      .equals {
        grid-column: span 4;
        background-color: #4CAF50;
        color: white;
      }

      .clear {
        background-color: #f44336;
        color: white;
      }
    `;

    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");

    this.display = document.createElement("input");
    this.display.type = "text";
    this.display.readOnly = true;
    this.display.classList.add("display");

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("buttons");

    const buttons = [
      "7",
      "8",
      "9",
      "/",
      "4",
      "5",
      "6",
      "*",
      "1",
      "2",
      "3",
      "-",
      "0",
      ".",
      "C",
      "+",
      "=",
    ];

    buttons.forEach((text) => {
      const btn = document.createElement("button");
      btn.textContent = text;

      if (text === "=") {
        btn.classList.add("equals");
        btn.addEventListener("click", () => {
          try {
            const result = eval(this.display.value);
            this.display.value = Number.isFinite(result) ? result : "Error";
          } catch {
            this.display.value = "Error";
          }
        });
      } else if (text === "C") {
        btn.classList.add("clear");
        btn.addEventListener("click", () => {
          this.display.value = "";
        });
      } else {
        btn.addEventListener("click", () => {
          this.display.value += text;
        });
      }

      buttonContainer.appendChild(btn);
    });

    wrapper.appendChild(this.display);
    wrapper.appendChild(buttonContainer);

    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(wrapper);
  }

  connectedCallback() {}

  disconnectedCallback() {}

  adoptedCallback() {}
  static get observedAttributes() {
    return [];
  }
  attributeChangedCallback(name, oldVal, newVal) {}
}

customElements.define("x-calculator", CustomCalculator);
