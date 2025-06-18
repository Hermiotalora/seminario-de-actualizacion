class ApplicationModel {
  constructor() {
    this.dbName = "ProductosDB";
    this.storeName = "productos";
    this.dbVersion = 1;
    this._initDB();
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
  }

  _initDB() {
    const req = indexedDB.open(this.dbName, this.dbVersion);
    req.onupgradeneeded = e => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(this.storeName)) {
        db.createObjectStore(this.storeName, { keyPath: "codigo" });
      }
    };
    req.onsuccess = e => { this.db = e.target.result; };
    req.onerror = () => { console.error("Error al abrir IndexedDB"); };
  }

  _withStore(mode, callback) {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        return setTimeout(() => this._withStore(mode, callback).then(resolve).catch(reject), 100);
      }
      const tx = this.db.transaction(this.storeName, mode);
      const store = tx.objectStore(this.storeName);
      const result = callback(store);
      tx.oncomplete = () => resolve(result);
      tx.onerror = () => reject(tx.error);
    });
  }

  listarProductos() {
    return new Promise((resolve, reject) => {
      const productos = [];
      this._withStore("readonly", store => {
        const cursor = store.openCursor();
        cursor.onsuccess = e => {
          const c = e.target.result;
          if (c) {
            productos.push(c.value);
            c.continue();
          } else {
            resolve(productos);
          }
        };
        cursor.onerror = reject;
      });
    });
  }

  crearProducto(codigo, descripcion, precio, stock) {
    return this._withStore("readwrite", store => {
      const req = store.add({ codigo, descripcion, precio, stock });
      return new Promise((resolve, reject) => {
        req.onsuccess = () => resolve({ success: true, message: "Producto creado." });
        req.onerror = () => resolve({ success: false, message: "Ya existe o error." });
      });
    });
  }

  editarProducto(codigo, descripcion, precio, stock) {
    return this._withStore("readwrite", store => {
      store.put({ codigo, descripcion, precio, stock });
      return { success: true, message: "Producto actualizado." };
    });
  }

  eliminarProducto(codigo) {
    return this._withStore("readwrite", store => {
      store.delete(codigo);
      return true;
    });
  }

  obtenerProducto(codigo) {
    return new Promise((resolve, reject) => {
      this._withStore("readonly", store => {
        const req = store.get(codigo);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => resolve(null);
      });
    });
  }

  validarCredenciales(user, pass) {
    return this.usuarios.has(user) && this.usuarios.get(user).pass === pass;
  }

  obtenerRol(user) {
    return this.usuarios.get(user).rol;
  }

  tienePermiso(rol, accion) {
    return this.permisos[rol]?.includes(accion);
  }
}
