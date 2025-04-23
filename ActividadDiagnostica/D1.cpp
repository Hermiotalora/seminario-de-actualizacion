#include <iostream>
#include <string>

using namespace std;

int main() {
    const string USUARIO_CORRECTO = "cliente123";
    const string CONTRASENA_CORRECTA = "limpieza2025";

    string usuario, contrasena;
    int intentos = 0;
    const int MAX_INTENTOS = 3;

    while (intentos < MAX_INTENTOS) {
        cout << "Ingrese nombre de usuario: ";
        cin >> usuario;

        cout << "Ingrese contraseniaa: ";
        cin >> contrasena;

        if (usuario == USUARIO_CORRECTO && contrasena == CONTRASENA_CORRECTA) {
            cout << "¡Bienvenido/a " << usuario << "!" << endl;
            return 0; 
        } else {
            intentos++;
            if (intentos == MAX_INTENTOS) {
                cout << "Usuario bloqueado. Contacte al administrador." << endl;
            } else {
                cout << "Usuario invalido." << endl;
            }
        }
    }

    return 0;
}
