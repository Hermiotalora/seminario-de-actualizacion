export class WCPostRequestFetch extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        const container = document.createElement("div");

        this.button = document.createElement("button");
        this.button.textContent = "Efectuar Solicitud";

        this.textarea = document.createElement("textarea");
        this.textarea.rows = 10;
        this.textarea.cols = 50;

        container.appendChild(this.button);
        container.appendChild(document.createElement("br"));
        container.appendChild(this.textarea);

        this.shadowRoot.appendChild(container);
    }

    connectedCallback() {
        this.button.addEventListener("click", () => this._fetchData());
    }

    disconnectedCallback() {
        this.button.removeEventListener("click", () => this._fetchData());
    }

    async _fetchData() {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
            if (!response.ok) throw new Error("Error en la solicitud");
            const data = await response.json();
            this.textarea.value = JSON.stringify(data, null, 2);
        } catch (err) {
            this.textarea.value = "Error: " + err.message;
        }
    }
}
