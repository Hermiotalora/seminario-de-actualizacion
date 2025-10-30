Endpoint: /IProductCatalog/SearchProducts

Metodo HTTP: GET
Formato Serializacion: JSON
Cabecera entrada: -
Cabecera salida: -
Estructura de datos IN:

{
    "keyword": "mouse"
}

[
    {
        "id": 1,
        "name": "Mouse optico",
        "price": 2500.0
    },
    {
        "id": 2,
        "name": "Mouse gamer RGB",
        "price": 4500.0
    }
]

{
    "type": "error",
    "description": "No products found"
}

Endpoint: /IProductCatalog/GetProductById

Metodo HTTP: GET
Formato Serializacion: JSON
Estructura de datos IN:

{
    "id": 3
}

{
    "id": 3,
    "name": "Teclado mecanico",
    "price": 18000.0
}

{
    "type": "error",
    "description": "Product not found"
}

Endpoint: /IProductCatalog/UpdateStock

Metodo HTTP: PATCH
Formato Serializacion: JSON
Estructura de datos IN:

{
    "productId": 3,
    "newStock": 25
}

{
    "success": true
}

{
    "type": "error",
    "description": "Unable to update stock"
}
