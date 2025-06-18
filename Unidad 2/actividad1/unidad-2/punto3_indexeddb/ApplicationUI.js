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
    if (this.model.tienePermiso(rol, "listar")) opciones.push("1 - Listar");
    if (this.model.tienePermiso(rol, "crear")) opciones.push("2 - Crear");
    if (this.model.tienePermiso(rol, "editar")) opciones.push("3 - Editar");
    if (this.model.tienePermiso(rol, "eliminar")) opciones.push("4 - Eliminar");
    if (this.model.tienePermiso(rol, "comprar")) opciones.push("5 - Comprar");
    opciones.push("X - Salir");
    return prompt("Seleccione una accion:\n" + opciones.join("\n")).toUpperCase();
  }

  async gestionarAccion(opcion, rol) {
    switch (opcion) {
      case "1":
        const productos = await this.model.listarProductos();
        if (productos.length === 0) return this.mostrarMensaje("No hay productos.");
        let salida = "Productos:\n";
        for (const p of productos) {
          salida += `${p.codigo}: ${p.descripcion} - $${p.precio} - Stock: ${p.stock}\n`;
        }
        this.mostrarMensaje(salida);
        break;

      case "2":
        const c = prompt("Código:");
        const d = prompt("Descripcion:");
        const p = parseFloat(prompt("Precio:"));
        const s = parseInt(prompt("Stock:"));
        this.mostrarMensaje((await this.model.crearProducto(c, d, p, s)).message);
        break;

      case "3":
        const ce = prompt("Codigo del producto:");
        const prod = await this.model.obtenerProducto(ce);
        if (!prod) return this.mostrarMensaje("No existe.");
        const d3 = prompt("Descripcion:", prod.descripcion);
        const p3 = parseFloat(prompt("Precio:", prod.precio));
        const s3 = parseInt(prompt("Stock:", prod.stock));
        this.mostrarMensaje((await this.model.editarProducto(ce, d3, p3, s3)).message);
        break;

      case "4":
        const cd = prompt("Codigo a eliminar:");
        await this.model.eliminarProducto(cd);
        this.mostrarMensaje("Producto eliminado.");
        break;

      case "5":
        const cc = prompt("Codigo:");
        const pr = await this.model.obtenerProducto(cc);
        if (!pr) return this.mostrarMensaje("No existe.");
        const cantidad = parseInt(prompt(`Stock: ${pr.stock}\nCantidad a comprar:`));
        if (cantidad > 0 && cantidad <= pr.stock) {
          pr.stock -= cantidad;
          this.mostrarMensaje((await this.model.editarProducto(cc, pr.descripcion, pr.precio, pr.stock)).message);
        } else {
          this.mostrarMensaje("Cantidad invalida.");
        }
        break;

      case "X":
        this.mostrarMensaje("Sesion finalizada.");
        break;

      default:
        this.mostrarMensaje("Opcion invalida.");
    }
  }
}
