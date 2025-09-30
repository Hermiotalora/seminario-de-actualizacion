export class WCPostRequestFetch extends HTMLElement {
constructor() {
        super();

        this.requestBtn = document.createElement("button");
        this.clearBtn = document.createElement("button");
        this.outputTextArea = document.createElement("textarea");

        this.requestBtn.innerText = "Efectuar Solicitud";
        this.clearBtn.innerText = "Limpiar";
        this.outputTextArea.rows = 10;
        this.outputTextArea.cols = 50;

        var style = document.createElement("style");
        style.textContent = `
            :host {
                display: flex;
                flex-direction: column;
                gap: 10px;
                width: 360px;
                font-family: Arial, sans-serif;
                margin-top: 10px;
            }
            button {
                padding: 8px;
                background-color: #28a745;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            }
            button:hover {
                background-color: #1e7e34;
            }
            textarea {
                resize: none;
                padding: 6px;
                font-size: 14px;
            }
        `;

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(this.requestBtn);
        this.shadowRoot.appendChild(this.clearBtn);
        this.shadowRoot.appendChild(this.outputTextArea);
    }

    onClearButtonClick(event) {
        this.outputTextArea.value = "";
    }

    async onRequestButtonClick(event) {
        try {
            var response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
            if (!response.ok) {
                throw new Error("Error en la solicitud: " + response.status);
            }
            var data = await response.json();
            this.outputTextArea.value = JSON.stringify(data, null, 2);
        } catch (error) {
            this.outputTextArea.value = "Error: " + error.message;
        }
    }

    connectedCallback() {
        this.requestBtn.onclick = this.onRequestButtonClick.bind(this);
        this.clearBtn.onclick = this.onClearButtonClick.bind(this);
    }

    disconnectedCallback() {
        this.requestBtn.onclick = null;
        this.clearBtn.onclick = null;
    }
}
