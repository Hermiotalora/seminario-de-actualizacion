import './WCComponents/WCPostsTable.js';

function main() {
    const postsTable = document.createElement('wc-posts-table');
    document.body.appendChild(postsTable);
}

window.onload = main;
