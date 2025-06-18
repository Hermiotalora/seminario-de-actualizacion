class ApplicationUI {
  constructor(model) {
    this.model = model;
  }

  pedirCredenciales() {
    const user = prompt("Usuario:");
    const pass = prompt("Contraseña:");
    return { user, pass };
  }

  mostrarMensaje(msg) {
    alert(msg);
  }

  mostrarMenu(rol) {
    const opciones = [];
    if (this.model.tienePermiso(rol, "listar")) opciones.push("1 - Listar productos");
    if (this.model.tienePermiso(rol, "crear")) opciones.push("2 - Crear producto");
    if (this.model.tienePermiso(rol, "editar")) opciones.push("3 - Editar producto");
    if (this.model.tienePermiso(rol, "eliminar")) opciones.push("4 - Eliminar producto");
    if (this.model.tienePermiso(rol, "comprar")) opciones.push("5 - Comprar producto");
    opciones.push("X - Salir");
    return prompt("Seleccione una accion:\n" + opciones.join("\n")).toUpperCase();
  }

  gestionarAccion(op, rol) {
    switch (op) {
      case "1":
        const lista = this.model.getProductos();
        let salida = "Productos:\n";
        for (const [c, p] of lista) salida += `${c}: ${p.descripcion} - $${p.precio} - Stock: ${p.stock}\n`;
        this.mostrarMensaje(salida);
        break;
      case "2":
        const nc = prompt("Codigo:"), nd = prompt("Descripcion:"), np = parseFloat(prompt("Precio:")), ns = parseInt(prompt("Stock:"));
        this.mostrarMensaje(this.model.crearProducto(nc, nd, np, ns).message);
        break;
      case "3":
        const ce = prompt("Codigo:"), p = this.model.getProducto(ce);
        if (!p) return this.mostrarMensaje("No existe.");
        const d = prompt("Descripción:", p.descripcion), pr = parseFloat(prompt("Precio:", p.precio)), st = parseInt(prompt("Stock:", p.stock));
        this.mostrarMensaje(this.model.editarProducto(ce, d, pr, st).message);
        break;
      case "4":
        const delc = prompt("Codigo a eliminar:");
        this.mostrarMensaje(this.model.eliminarProducto(delc) ? "Eliminado." : "No encontrado.");
        break;
      case "5":
        const cod = prompt("Codigo:"), prd = this.model.getProducto(cod);
        if (!prd) return this.mostrarMensaje("No existe.");
        const cant = parseInt(prompt(`Stock ${prd.stock}\nCantidad:`));
        this.mostrarMensaje(this.model.comprarProducto(cod, cant).message);
        break;
      case "X": this.mostrarMensaje("Sesion finalizada."); break;
      default: this.mostrarMensaje("Opcion invalida.");
    }
  }
}