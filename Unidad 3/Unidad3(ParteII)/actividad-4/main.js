import "./WCComponents/WCModalDialog.js";

const btn = document.getElementById("btnAbrir");
const modal = document.getElementById("miModal");

btn.addEventListener("click", () => modal.open());

modal.addEventListener("dialog-close", e => {
  alert("El modal fue cerrado con acción: " + e.detail.action);
});
