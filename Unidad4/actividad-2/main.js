import { WCPostRequestFetch } from "./WCComponents/WCPostRequestFetch.js";

customElements.define("wc-post-request-fetch", WCPostRequestFetch);

function main() {
    var comp = new WCPostRequestFetch();
    document.body.appendChild(comp);
}

window.onload = main;
