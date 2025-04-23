#include <iostream>
#include <string>
using namespace std;

struct Articulo {
    int id;
    string nombre;
    float precio;
    int stock;
};

int main() {
    const int TAM = 3;
    Articulo articulos[TAM] = {
        {1, "Lavandina x 1L", 875.25, 3000},
        {4, "Detergente x 500mL", 1102.45, 2010},
        {22, "Jabon en polvo x 250g", 650.22, 407}
    };

    cout << "Listado de articulos de limpieza:\n";
    for (int i = 0; i < TAM; i++) {
        cout << "ID: " << articulos[i].id << endl;
        cout << "Nombre: " << articulos[i].nombre << endl;
        cout << "Precio: $" << articulos[i].precio << endl;
        cout << "Stock: " << articulos[i].stock << " unidades\n";
        cout << "....................................\n";
    }

    return 0;
}
