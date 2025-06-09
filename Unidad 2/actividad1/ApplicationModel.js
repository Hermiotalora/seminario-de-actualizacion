function ApplicationModel() {
    this.usuarios = new Map([
        ["admin", { pass: "admin123", rol: "administrador" }],
        ["cliente1", { pass: "cliente123", rol: "cliente" }],
        ["vendedor1", { pass: "vende123", rol: "vendedor" }],
        ["deposito1", { pass: "deposito123", rol: "deposito" }]
    ]);

    this.permisos = {
        administrador: ["crear", "listar", "editar", "eliminar", "comprar"],
        cliente: ["listar", "comprar"],
        vendedor: ["listar", "comprar"],
        deposito: ["listar"]
    };

    this.productos = new Map([
        ["001", { descripcion: "Lavandina", precio: 250, stock: 100 }],
        ["002", { descripcion: "Detergente", precio: 300, stock: 50 }]
    ]);

    this.validarCredenciales = function(user, pass) {
        return this.usuarios.has(user) && this.usuarios.get(user).pass === pass;
    };

    this.obtenerRol = function(user) {
        return this.usuarios.get(user)?.rol;
    };

    this.tienePermiso = function(rol, accion) {
        return this.permisos[rol]?.includes(accion);
    };

    this.getProductos = function() {
        return new Map(this.productos);
    };

    this.getProducto = function(codigo) {
        return this.productos.get(codigo);
    };

    this.crearProducto = function(codigo, descripcion, precio, stock) {
        if (this.productos.has(codigo)) return { success: false, message: "El producto ya existe." };
        this.productos.set(codigo, { descripcion, precio, stock });
        return { success: true, message: "Producto creado." };
    };

    this.editarProducto = function(codigo, descripcion, precio, stock) {
        if (!this.productos.has(codigo)) return { success: false, message: "Producto no encontrado." };
        this.productos.set(codigo, { descripcion, precio, stock });
        return { success: true, message: "Producto actualizado." };
    };

    this.eliminarProducto = function(codigo) {
        return this.productos.delete(codigo);
    };

    this.comprarProducto = function(codigo, cantidad) {
        const producto = this.productos.get(codigo);
        if (!producto) return { success: false, message: "Producto no encontrado." };
        if (cantidad <= 0 || cantidad > producto.stock) return { success: false, message: "Cantidad invalida o stock insuficiente." };
        producto.stock -= cantidad;
        return { success: true, message: `Compra realizada. Stock restante: ${producto.stock}` };
    };
}
