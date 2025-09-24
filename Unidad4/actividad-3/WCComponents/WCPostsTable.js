export class WCPostsTable extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.container = document.createElement('div');

        this.button = document.createElement('button');
        this.button.textContent = "Efectuar solicitud";

        this.table = document.createElement('table');
        this.table.border = "1";

        this.container.appendChild(this.button);
        this.container.appendChild(this.table);
        this.shadowRoot.appendChild(this.container);
    }

    connectedCallback() {
        this.button.addEventListener('click', () => this.fetchPosts());
    }

    disconnectedCallback() {
        this.button.removeEventListener('click', () => this.fetchPosts());
    }

    async fetchPosts() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const posts = await response.json();
            this.renderTable(posts);
        } catch (error) {
            console.error("Error al obtener los posts:", error);
        }
    }

    renderTable(posts) {
        this.table.innerHTML = "";

        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

        ["ID", "Título", "Contenido"].forEach(text => {
            const th = document.createElement('th');
            th.textContent = text;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);

        const tbody = document.createElement('tbody');
        posts.forEach(post => {
            const tr = document.createElement('tr');

            const tdId = document.createElement('td');
            tdId.textContent = post.id;
            tr.appendChild(tdId);

            const tdTitle = document.createElement('td');
            tdTitle.textContent = post.title;
            tr.appendChild(tdTitle);

            const tdBody = document.createElement('td');
            tdBody.textContent = post.body;
            tr.appendChild(tdBody);

            tbody.appendChild(tr);
        });

        this.table.appendChild(thead);
        this.table.appendChild(tbody);
    }
}

customElements.define('wc-posts-table', WCPostsTable);
