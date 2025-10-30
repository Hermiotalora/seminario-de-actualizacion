Endpoint: /IAuthService/Login

Metodo HTTP: POST
Formato Serializacion: JSON
Estructura de datos IN:

{
    "user": "admin",
    "password": "1234"
}

{
    "token": "abc123xyz"
}

{
    "type": "error",
    "description": "Invalid credentials"
}

Endpoint: /IAuthService/Logout

Metodo HTTP: POST
Formato Serializacion: JSON
Estructura de datos IN:

{
    "token": "abc123xyz"
}

{
    "success": true
}

{
    "type": "error",
    "description": "Invalid or expired token"
}

Endpoint: /IAuthService/ValidateToken

Metodo HTTP: GET
Formato Serializacion: JSON
Estructura de datos IN:

{
    "token": "abc123xyz"
}

{
    "valid": true
}

{
    "type": "error",
    "description": "Token not valid"
}
