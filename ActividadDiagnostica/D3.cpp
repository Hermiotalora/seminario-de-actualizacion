#include <iostream>
#include <string>
using namespace std;

bool esContrasenaSegura(string pass) {
    int mayus = 0, simbolos = 0;

    if (pass.length() < 8 || pass.length() > 16)
        return false;

    for (int i = 0; i < pass.length(); i++) {
        if (pass[i] >= 'A' && pass[i] <= 'Z')
            mayus++;
        if (!isalnum(pass[i]))
            simbolos++;
    }

    return (mayus >= 1 && simbolos >= 2);
}

int main() {
    string usuario = "cliente";
    string contrasena = "Clave@#2025";
    int intentos = 0;

    while (intentos < 3) {
        string u, c;
        cout << "Usuario: ";
        cin >> u;
        cout << "Contrasena: ";
        cin >> c;

        if (u == usuario && c == contrasena) {
            cout << "¡Bienvenido/a " << usuario << "!\n";
            cout << "1. Cambiar contraseña\nX. Salir\nOpcion: ";
            char op;
            cin >> op;

            if (op == '1') {
                string nueva;
                cout << "Nueva contrasena: ";
                cin >> nueva;

                if (esContrasenaSegura(nueva)) {
                    contrasena = nueva;
                    cout << "Contrasena actualizada.\n";
                } else {
                    cout << "Contrasena debil.\n";
                }
            }
            break;
        } else {
            intentos++;
            if (intentos == 3)
                cout << "Usuario bloqueado. Contacte al administrador.\n";
            else
                cout << "Usuario invalido.\n";
        }
    }

    return 0;
}
