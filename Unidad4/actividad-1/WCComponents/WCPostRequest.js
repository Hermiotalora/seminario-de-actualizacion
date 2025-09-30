export class WCPostRequest extends HTMLElement {
    constructor() {
        super();

        this.requestBtn = document.createElement("button");
        this.clearBtn = document.createElement("button");
        this.outputTextArea = document.createElement("textarea");

        this.requestBtn.innerText = "Efectuar Solicitud";
        this.clearBtn.innerText = "Limpiar";
        this.outputTextArea.rows = 10;
        this.outputTextArea.cols = 40;

        var style = document.createElement("style");
        style.textContent = `
            :host {
                display: flex;
                flex-direction: column;
                gap: 10px;
                width: 320px;
                font-family: Arial, sans-serif;
                margin-top: 10px;
            }
            button {
                padding: 8px;
                background-color: #007bff;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            }
            button:hover {
                background-color: #0056b3;
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

    onRequestButtonClick(event) {
        var xhr = new XMLHttpRequest();
        var self = this;

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    self.outputTextArea.value = xhr.responseText;
                } else {
                    console.error(xhr.statusText);
                }
                self.requestBtn.disabled = false;
            }
        };

        xhr.onerror = function () {
            console.error(xhr.statusText);
            self.requestBtn.disabled = false;
        };

        xhr.open("GET", "https://jsonplaceholder.typicode.com/posts/1");
        xhr.send();
        this.requestBtn.disabled = true;
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

customElements.define("wc-post-request", WCPostRequest);
