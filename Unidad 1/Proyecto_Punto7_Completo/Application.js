import { LoginApplicationView } from './LoginApplicationView.js';

class Application
{
	constructor( apiInstanceObject )
	{
		this._api = apiInstanceObject;
		this._defaultView = new LoginApplicationView(this._api);		
		this._maxLoginFailedAttempts = this._api.getMaxLoginAttempts();
		this._attempts = 0;
		this._api_return = null;
	}

	init()
	{
		this._api_return = this._defaultView.show();
	}

	run()
	{
		while( this._api_return.result == 'USER_PASSWORD_FAILED' && this._attempts < this._maxLoginFailedAttempts )
		{
			this._api_return = this._defaultView.show();

			if ( this._api_return.result == 'USER_PASSWORD_FAILED' )
			{
				this._attempts++;
			}
		}
	}
}

let productos = new Map();

productos.set("A001", { descripcion: "Lavandina", precio: 250, stock: 100 });
productos.set("A002", { descripcion: "Detergente", precio: 320, stock: 50 });
productos.set("A003", { descripcion: "Desinfectante", precio: 400, stock: 75 });

export function listarArticulos() {
    if (productos.size === 0) {
        alert("No hay articulos cargados.");
        return;
    }

    let mensaje = "Listado de articulos:\n\n";
    for (let [codigo, articulo] of productos.entries()) {
        mensaje += `Codigo: ${codigo}\nDescripcion: ${articulo.descripcion}\nPrecio: $${articulo.precio}\nStock: ${articulo.stock}\n\n`;
    }

    alert(mensaje);
}

export function nuevoArticulo() {
    let codigo = prompt("Ingrese codigo del nuevo articulo:");

    if (productos.has(codigo)) {
        alert("Ya existe un articulo con ese código.");
        return;
    }

    let descripcion = prompt("Ingrese descripcion:");
    let precio = parseFloat(prompt("Ingrese precio:"));
    let stock = parseInt(prompt("Ingrese stock:"));

    productos.set(codigo, {
        descripcion: descripcion,
        precio: precio,
        stock: stock
    });

    alert("Articulo agregado exitosamente.");
}

export function editarArticulo() {
    let codigo = prompt("Ingrese codigo del articulo a editar:");

    if (!productos.has(codigo)) {
        alert("Articulo no encontrado.");
        return;
    }

    let articulo = productos.get(codigo);

    let descripcion = prompt("Ingrese nueva descripcion:", articulo.descripcion);
    let precio = parseFloat(prompt("Ingrese nuevo precio:", articulo.precio));
    let stock = parseInt(prompt("Ingrese nuevo stock:", articulo.stock));

    productos.set(codigo, {
        descripcion: descripcion,
        precio: precio,
        stock: stock
    });

    alert("Articulo actualizado exitosamente.");
}

export function eliminarArticulo() {
    let codigo = prompt("Ingrese codigo del articulo a eliminar:");

    if (!productos.has(codigo)) {
        alert("Articulo no encontrado.");
        return;
    }

    productos.delete(codigo);
    alert("Articulo eliminado exitosamente.");
}

export function comprarArticulo() {
    let codigo = prompt("Ingrese el codigo del articulo que desea comprar:");

    if (!productos.has(codigo)) {
        alert("Articulo no encontrado.");
        return;
    }

    let articulo = productos.get(codigo);

    if (articulo.stock === 0) {
        alert("Este articulo no tiene stock disponible.");
        return;
    }

    let cantidad = parseInt(prompt(`Stock disponible: ${articulo.stock}\nIngrese cantidad a comprar:`));

    if (isNaN(cantidad) || cantidad <= 0) {
        alert("Cantidad invalida.");
        return;
    }

    if (cantidad > articulo.stock) {
        alert(`No hay suficiente stock. Solo quedan ${articulo.stock} unidades.`);
        return;
    }

    let confirmar = prompt(`¿Confirmar compra de ${cantidad} unidad(es) de "${articulo.descripcion}"? (S/N)`);

    if (confirmar.toUpperCase() === "S") {
        articulo.stock -= cantidad;
        productos.set(codigo, articulo); 
        alert(`Compra realizada.\nStock restante: ${articulo.stock}`);
    } else {
        alert("Operacion cancelada.");
    }
}


export { Application };


