import { APIModelAccess } from './APIModelAccess.js';
import { Application } from './Application.js';
import * as App from './Application.js';

function mostrarMenu() {
    let opcion;

    do {
        opcion = prompt(
  	 "Menu Principal:\n" +
	 "1 - Iniciar sesion\n" +
   	 "2 - Crear cuenta\n" +
   	 "3 - Gestion de articulos\n" +
   	 "X - Salir"
);


        switch (opcion) {
            case "1":
                break;
            case "2":
                break;
            case "3":
                App.listarArticulos();
                break;
            case "X":
            case "x":
                alert("¡Hasta luego!");
                break;
            default:
                alert("Opcion invalida");
        }
    } while (opcion !== "X" && opcion !== "x");
}

function main()
{
	let model = new APIModelAccess();
	let app = new Application(model);

	app.init();
	app.run();
	mostrarMenu();

}

function menuGestionArticulos() {
    let opcion;

    do {
        opcion = prompt(
            "Gestion de articulos:\n" +
            "1 - Listar articulos\n" +
            "2 - Nuevo articulo\n" +
            "3 - Editar articulo\n" +
            "4 - Eliminar articulo\n" +
            "5 - Comprar articulo\n" +   
            "X - Volver"
        );

        switch (opcion) {
            case "1":
                App.listarArticulos();
                break;
            case "2":
                App.nuevoArticulo();
                break;
            case "3":
                App.editarArticulo();
				menuGestionArticulos(); 
                break;
            case "4":
                App.eliminarArticulo();
                break;
            case "5":
                App.comprarArticulo();  
                break;
            case "X":
            case "x":
                alert("Volviendo al menu principal...");
                break;
            default:
                alert("Opcion invalida.");
        }
    } while (opcion !== "X" && opcion !== "x");
}


window.onload = main;