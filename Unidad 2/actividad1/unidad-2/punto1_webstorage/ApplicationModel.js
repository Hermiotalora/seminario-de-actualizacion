class ApplicationModel {
  constructor(tipo = "localStorage") {
    this.storage = (tipo === "sessionStorage") ? sessionStorage : localStorage;
    this.key = "productos";
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
    this.productos = this._cargarProductos();
  }

  _cargarProductos() {
    const datos = this.storage.getItem(this.key);
    if (datos) return new Map(JSON.parse(datos));
    const iniciales = new Map([
      ["001", { descripcion: "Lavandina", precio: 250, stock: 100 }],
      ["002", { descripcion: "Detergente", precio: 300, stock: 50 }]
    ]);
    this._guardarProductos(iniciales);
    return iniciales;
  }

  _guardarProductos(productos = this.productos) {
    this.storage.setItem(this.key, JSON.stringify(Array.from(productos.entries())));
  }

  validarCredenciales(u, p) {
    return this.usuarios.has(u) && this.usuarios.get(u).pass === p;
  }

  obtenerRol(u) {
    return this.usuarios.get(u)?.rol;
  }

  tienePermiso(r, a) {
    return this.permisos[r]?.includes(a);
  }

  getProductos() {
    return new Map(this.productos);
  }

  getProducto(c) {
    return this.productos.get(c);
  }

  crearProducto(c, d, p, s) {
    if (this.productos.has(c)) return { success: false, message: "Ya existe." };
    this.productos.set(c, { descripcion: d, precio: p, stock: s });
    this._guardarProductos();
    return { success: true, message: "Producto creado." };
  }

  editarProducto(c, d, p, s) {
    if (!this.productos.has(c)) return { success: false, message: "No existe." };
    this.productos.set(c, { descripcion: d, precio: p, stock: s });
    this._guardarProductos();
    return { success: true, message: "Producto actualizado." };
  }

  eliminarProducto(c) {
    const ok = this.productos.delete(c);
    this._guardarProductos();
    return ok;
  }

  comprarProducto(c, cant) {
    const prod = this.productos.get(c);
    if (!prod || cant > prod.stock || cant <= 0)
      return { success: false, message: "Cantidad invalida o stock insuficiente." };
    prod.stock -= cant;
    this._guardarProductos();
    return { success: true, message: `Compra realizada. Stock: ${prod.stock}` };
  }
}