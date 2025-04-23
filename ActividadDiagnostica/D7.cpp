#include <iostream>
#include <string>
using namespace std;

const int MAX = 100;

struct Articulo {
    int id;
    string nombre;
    float precio;
    int stock;
};

void mostrarArticulos(Articulo articulos[], int cantidad) {
    if (cantidad == 0) {
        cout << "No hay articulos cargados.\n";
        return;
    }
    for (int i = 0; i < cantidad; i++) {
        cout << "ID: " << articulos[i].id << endl;
        cout << "Nombre: " << articulos[i].nombre << endl;
        cout << "Precio: $" << articulos[i].precio << endl;
        cout << "Stock: " << articulos[i].stock << " unidades\n";
        cout << ".................................\n";
    }
}

void nuevoArticulo(Articulo articulos[], int &cantidad) {
    if (cantidad >= MAX) {
        cout << "No se pueden agregar mas articulos.\n";
        return;
    }
    Articulo a;
    cout << "Ingrese ID: ";
    cin >> a.id;
    cin.ignore();
    cout << "Ingrese nombre: ";
    getline(cin, a.nombre);
    cout << "Ingrese precio: ";
    cin >> a.precio;
    cout << "Ingrese stock: ";
    cin >> a.stock;
    articulos[cantidad++] = a;
    cout << "Articulo agregado con exito.\n";
}

void editarArticulo(Articulo articulos[], int cantidad) {
    int id;
    cout << "Ingrese el ID del articulo a editar: ";
    cin >> id;
    for (int i = 0; i < cantidad; i++) {
        if (articulos[i].id == id) {
            cin.ignore();
            cout << "Nuevo nombre: ";
            getline(cin, articulos[i].nombre);
            cout << "Nuevo precio: ";
            cin >> articulos[i].precio;
            cout << "Nuevo stock: ";
            cin >> articulos[i].stock;
            cout << "Articulo actualizado.\n";
            return;
        }
    }
    cout << "Articulo no encontrado.\n";
}

void eliminarArticulo(Articulo articulos[], int &cantidad) {
    int id;
    cout << "Ingrese el ID del articulo que quiera eliminar: ";
    cin >> id;
    for (int i = 0; i < cantidad; i++) {
        if (articulos[i].id == id) {
            for (int j = i; j < cantidad - 1; j++) {
                articulos[j] = articulos[j + 1];
            }
            cantidad--;
            cout << "Articulo eliminado.\n";
            return;
        }
    }
    cout << "Articulo no encontrado.\n";
}

void comprarArticulo(Articulo articulos[], int cantidad) {
    int id;
    cout << "Ingrese el ID del articulo que desea comprar: ";
    cin >> id;
    for (int i = 0; i < cantidad; i++) {
        if (articulos[i].id == id) {
            cout << "Articulo: " << articulos[i].nombre << endl;
            cout << "Precio por unidad: $" << articulos[i].precio << endl;
            cout << "Stock disponible: " << articulos[i].stock << endl;

            if (articulos[i].stock <= 0) {
                cout << "No hay stock disponible para este producto.\n";
                return;
            }

            int cantidadCompra;
            cout << "Ingrese la cantidad a comprar: ";
            cin >> cantidadCompra;

            if (cantidadCompra > articulos[i].stock) {
                cout << "No hay suficiente stock disponible.\n";
                return;
            }

            char confirmar;
            cout << "Total a pagar: $" << cantidadCompra * articulos[i].precio << endl;
            cout << "¿Desea confirmar la compra? (s/n): ";
            cin >> confirmar;

            if (confirmar == 's' || confirmar == 'S') {
                articulos[i].stock -= cantidadCompra;
                cout << "Compra realizada con exito.\n";
            } else {
                cout << "Operacion cancelada.\n";
            }
            return;
        }
    }
    cout << "Articulo no encontrado.\n";
}

int main() {
    Articulo articulos[MAX] = {
        {1, "Lavandina x 1L", 875.25, 3000},
        {4, "Detergente x 500mL", 1102.45, 2010},
        {22, "Jabon en polvo x 250g", 650.22, 407}
    };
    int cantidad = 3;

    int opcion;
    do {
        cout << "\n--- Menu CRUD de Articulos ---\n";
        cout << "1. Listar articulos\n";
        cout << "2. Nuevo articulo\n";
        cout << "3. Editar articulo\n";
        cout << "4. Eliminar articulo\n";
        cout << "5. Comprar articulo\n";
        cout << "0. Salir\n";
        cout << "Ingrese una opcion: ";
        cin >> opcion;

        switch (opcion) {
            case 1:
                mostrarArticulos(articulos, cantidad);
                break;
            case 2:
                nuevoArticulo(articulos, cantidad);
                break;
            case 3:
                editarArticulo(articulos, cantidad);
                break;
            case 4:
                eliminarArticulo(articulos, cantidad);
                break;
            case 5:
                comprarArticulo(articulos, cantidad);
                break;
            case 0:
                cout << "Saliendo del programa...\n";
                break;
            default:
                cout << "Opcion invalida.\n";
        }

    } while (opcion != 0);

    return 0;
}
