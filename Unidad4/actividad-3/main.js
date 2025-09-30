import "./WCComponents/WCPostsTable.js";

function main() {
    var postsTable = document.createElement("wc-posts-table");
    document.body.appendChild(postsTable);
}

window.onload = main;
