Endpoint: /IUserService/GetAllUsers
Metodo HTTP: GET
Formato Serializacion: JSON
Cabecera entrada: -
Cabecera salida: -
Estructura de datos IN: -
Estructura de datos OUT:

[
    {
        "id": 1,
        "name": "Alice",
        "email": "alice@example.com"
    },
    {
        "id": 2,
        "name": "Bob",
        "email": "bob@example.com"
    }
]

{
    "type": "error",
    "description": "No users found"
}

Endpoint: /IUserService/GetUserById

Metodo HTTP: GET
Formato Serializacion: JSON
Cabecera entrada: -
Cabecera salida: -
Estructura de datos IN:

{
    "id": 5
}

{
    "id": 5,
    "name": "Carlos",
    "email": "carlos@example.com"
}

{
    "type": "error",
    "description": "User not found"
}

Endpoint: /IUserService/CreateUser

Metodo HTTP: POST
Formato Serializacion: JSON
Cabecera entrada: Content-Type: application/json
Cabecera salida: -
Estructura de datos IN:

{
    "name": "Laura",
    "email": "laura@example.com"
}

{
    "id": 10
}

{
    "type": "error",
    "description": "Invalid user data"
}

Endpoint: /IUserService/UpdateUser

Metodo HTTP: PUT
Formato Serializacion: JSON
Cabecera entrada: Content-Type: application/json
Cabecera salida: -
Estructura de datos IN:

{
    "id": 10,
    "name": "Laura G.",
    "email": "laurag@example.com"
}

{
    "success": true
}

{
    "type": "error",
    "description": "User not found"
}

Endpoint: /IUserService/DeleteUser

Metodo HTTP: DELETE
Formato Serializacion: JSON
Cabecera entrada: -
Cabecera salida: -
Estructura de datos IN:

{
    "id": 10
}

{
    "success": true
}

{
    "type": "error",
    "description": "Could not delete user"
}
