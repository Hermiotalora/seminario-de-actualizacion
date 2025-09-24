export class WCPostRequest extends HTMLElement {
    constructor() {
        super();

        // Contenedor principal
        this.container = document.createElement("div");
        this.container.style.margin = "20px";

        // Botón
        this.button = document.createElement("button");
        this.button.innerText = "Efectuar Solicitud";
        this.button.style.padding = "10px";
        this.button.style.marginBottom = "10px";
        this.button.style.cursor = "pointer";

        // Área de texto
        this.textArea = document.createElement("textarea");
        this.textArea.rows = 10;
        this.textArea.cols = 50;
        this.textArea.style.display = "block";

        // Agregar elementos al contenedor
        this.container.appendChild(this.button);
        this.container.appendChild(document.createElement("br"));
        this.container.appendChild(this.textArea);

        // Vincular evento al botón
        this.button.addEventListener("click", () => this.makeRequest());
    }

    connectedCallback() {
        // Renderizar el contenido del componente
        this.appendChild(this.container);
    }

    disconnectedCallback() {
        // Limpiar el listener si se elimina el componente
        this.button.removeEventListener("click", this.makeRequest);
    }

    makeRequest() {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "https://jsonplaceholder.typicode.com/posts/1");

        xhr.onload = () => {
            if (xhr.status === 200) {
                this.textArea.value = xhr.responseText;
            } else {
                this.textArea.value = "Error en la solicitud: " + xhr.status;
            }
        };

        xhr.onerror = () => {
            this.textArea.value = "Error de red.";
        };

        xhr.send();
    }
}

customElements.define("wc-post-request", WCPostRequest);
