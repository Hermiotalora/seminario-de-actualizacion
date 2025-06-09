function ApplicationUI(model) {
    this.model = model;

    this.pedirCredenciales = function() {
        const user = prompt("Usuario:");
        const pass = prompt("Contraseña:");
        return { user, pass };
    };

    this.mostrarMensaje = function(msg) {
        alert(msg);
    };

    this.mostrarMenu = function(rol) {
        const opciones = [];
        if (this.model.tienePermiso(rol, "listar")) opciones.push("1 - Listar productos");
        if (this.model.tienePermiso(rol, "crear")) opciones.push("2 - Crear producto");
        if (this.model.tienePermiso(rol, "editar")) opciones.push("3 - Editar producto");
        if (this.model.tienePermiso(rol, "eliminar")) opciones.push("4 - Eliminar producto");
        if (this.model.tienePermiso(rol, "comprar")) opciones.push("5 - Comprar producto");
        opciones.push("X - Salir");
        return prompt("Seleccione una accion:\n" + opciones.join("\n")).toUpperCase();
    };

    this.gestionarAccion = function(opcion, rol) {
        switch (opcion) {
            case "1":
                const productos = this.model.getProductos();
                let salida = "Listado de productos:\n";
                for (let [codigo, p] of productos) {
                    salida += `${codigo}: ${p.descripcion} - $${p.precio} - Stock: ${p.stock}\n`;
                }
                this.mostrarMensaje(salida);
                break;

            case "2":
                const c1 = prompt("Nuevo codigo:");
                const d1 = prompt("Descripcion:");
                const p1 = parseFloat(prompt("Precio:"));
                const s1 = parseInt(prompt("Stock:"));
                this.mostrarMensaje(this.model.crearProducto(c1, d1, p1, s1).message);
                break;

            case "3":
                const c2 = prompt("Codigo del producto:");
                const p = this.model.getProducto(c2);
                if (!p) return this.mostrarMensaje("Producto no encontrado.");
                const d2 = prompt("Descripcion:", p.descripcion);
                const p2 = parseFloat(prompt("Precio:", p.precio));
                const s2 = parseInt(prompt("Stock:", p.stock));
                this.mostrarMensaje(this.model.editarProducto(c2, d2, p2, s2).message);
                break;

            case "4":
                const c3 = prompt("Codigo del producto a eliminar:");
                this.mostrarMensaje(this.model.eliminarProducto(c3) ? "Producto eliminado." : "Producto no encontrado.");
                break;

            case "5":
                const c4 = prompt("Codigo del producto:");
                const prod = this.model.getProducto(c4);
                if (!prod) return this.mostrarMensaje("Producto no encontrado.");
                const cantidad = parseInt(prompt(`Producto: ${prod.descripcion} - Stock disponible: ${prod.stock}\nCantidad a comprar:`));
                this.mostrarMensaje(this.model.comprarProducto(c4, cantidad).message);
                break;

            case "X":
                this.mostrarMensaje("Sesion finalizada.");
                break;

            default:
                this.mostrarMensaje("Opcion invalida.");
        }
    };
}
