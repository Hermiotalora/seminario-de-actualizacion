import "./WCComponents/WCModalDialog.js";
import "./WCComponents/WCContactForm.js";

const btn = document.getElementById("btnContact");
const modal = document.getElementById("modalContacto");

btn.addEventListener("click", () => modal.open());

modal.addEventListener("dialog-close", e => {
  if (e.detail.action === "accept") {
    alert("Su consulta fue recibida. A la brevedad lo contactaremos. Gracias");
  }
});
