export class WCPostsTable extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.container = document.createElement("div");

        this.button = document.createElement("button");
        this.button.textContent = "Efectuar solicitud";

        this.table = document.createElement("table");
        this.table.border = "1";

        var style = document.createElement("style");
        style.textContent = `
            div {
                display: flex;
                flex-direction: column;
                gap: 10px;
                margin-top: 10px;
            }
            button {
                padding: 8px;
                background-color: #17a2b8;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                width: fit-content;
            }
            button:hover {
                background-color: #117a8b;
            }
            table {
                border-collapse: collapse;
                width: 100%;
                font-family: Arial, sans-serif;
            }
            th, td {
                border: 1px solid #ddd;
                padding: 8px;
                text-align: left;
            }
            th {
                background-color: #f2f2f2;
            }
            tr:hover {
                background-color: #f9f9f9;
            }
        `;

        this.container.appendChild(this.button);
        this.container.appendChild(this.table);
        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(this.container);
    }

    connectedCallback() {
        this.button.onclick = this.fetchPosts.bind(this);
    }

    disconnectedCallback() {
        this.button.onclick = null;
    }

    async fetchPosts() {
        try {
            var response = await fetch("https://jsonplaceholder.typicode.com/posts");
            var posts = await response.json();
            this.renderTable(posts);
        } catch (error) {
            console.error("Error al obtener los posts:", error);
        }
    }

    renderTable(posts) {
        while (this.table.firstChild) {
            this.table.removeChild(this.table.firstChild);
        }

        var thead = document.createElement("thead");
        var headerRow = document.createElement("tr");

        var headers = ["ID", "Título", "Contenido"];
        for (var i = 0; i < headers.length; i++) {
            var th = document.createElement("th");
            th.textContent = headers[i];
            headerRow.appendChild(th);
        }
        thead.appendChild(headerRow);

        var tbody = document.createElement("tbody");
        for (var j = 0; j < posts.length; j++) {
            var post = posts[j];
            var tr = document.createElement("tr");

            var tdId = document.createElement("td");
            tdId.textContent = post.id;
            tr.appendChild(tdId);

            var tdTitle = document.createElement("td");
            tdTitle.textContent = post.title;
            tr.appendChild(tdTitle);

            var tdBody = document.createElement("td");
            tdBody.textContent = post.body;
            tr.appendChild(tdBody);

            tbody.appendChild(tr);
        }

        this.table.appendChild(thead);
        this.table.appendChild(tbody);
    }
}

customElements.define("wc-posts-table", WCPostsTable);
