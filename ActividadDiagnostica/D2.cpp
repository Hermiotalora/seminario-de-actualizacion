#include <iostream>
#include <string>

using namespace std;

int main() {
    string usuarioCorrecto = "cliente123";
    string contrasenaCorrecta = "limpieza2025";
    string usuario, contrasena;
    int intentos;
    const int MAX_INTENTOS = 3;
    char opcion;

    while (true) {
        intentos = 0;

        while (intentos < MAX_INTENTOS) {
            cout << "Ingrese nombre de usuario: ";
            cin >> usuario;
            cout << "Ingrese contrasena: ";
            cin >> contrasena;

            if (usuario == usuarioCorrecto && contrasena == contrasenaCorrecta) {
                cout << "¡Bienvenido/a " << usuario << "!" << endl;

                do {
                    cout << "\n Menu de acciones \n";
                    cout << "1. Cambiar contrasena\n";
                    cout << "X. Salir\n";
                    cout << "Seleccione una opción: ";
                    cin >> opcion;

                    if (opcion == '1') {
                        string nuevaContrasena;
                        cout << "Ingrese nueva contrasena: ";
                        cin >> nuevaContrasena;
                        contrasenaCorrecta = nuevaContrasena;
                        cout << "Contrasena cambiada exitosamente.\n";
                    } else if (opcion == 'X' || opcion == 'x') {
                        cout << "Sesión finalizada. Regresando al inicio...\n";
                    } else {
                        cout << "Opcion invalida. Intente nuevamente.\n";
                    }

                } while (opcion != 'X' && opcion != 'x');

                break; 
            } else {
                intentos++;
                if (intentos == MAX_INTENTOS) {
                    cout << "Usuario bloqueado. Contacte al administrador." << endl;
                } else {
                    cout << "Usuario invalido" << endl;
                }
            }
        }
    }

    return 0;
}
