function main() {
    const model = new ApplicationModel("localStorage"); // Cambiar por "sessionStorage" si se desea
    const ui = new ApplicationUI(model);

    const { user, pass } = ui.pedirCredenciales();

    if (!model.validarCredenciales(user, pass)) {
        return ui.mostrarMensaje("Credenciales invalidas.");
    }

    const rol = model.obtenerRol(user);
    ui.mostrarMensaje(`Bienvenido/a ${user}\nRol: ${rol}`);

    let opcion;
    do {
        opcion = ui.mostrarMenu(rol);
        ui.gestionarAccion(opcion, rol);
    } while (opcion !== "X");
}
main();