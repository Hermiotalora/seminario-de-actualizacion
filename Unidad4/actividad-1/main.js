import { WCPostRequest } from "./WCComponents/WCPostRequest.js";

function main() {
    let requestComponent = new WCPostRequest();
    document.body.appendChild(requestComponent);
}

window.onload = main;
