Endpoint: /IFileStorage/ListFiles

Metodo HTTP: GET
Formato Serializacion: JSON
Estructura de datos IN:

{
    "directory": "/documents"
}

[
    "report1.txt",
    "report2.pdf",
    "summary.docx"
]

{
    "type": "error",
    "description": "Directory not found"
}

Endpoint: /IFileStorage/ReadFile

Metodo HTTP: GET
Formato Serializacion: JSON
Estructura de datos IN:

{
    "path": "/documents/report1.txt"
}

{
    "content": "Contenido del archivo..."
}

{
    "type": "error",
    "description": "File not found or permission denied"
}

Endpoint: /IFileStorage/WriteFile

Metodo HTTP: POST
Formato Serializacion: JSON
Estructura de datos IN:

{
    "path": "/documents/new.txt",
    "content": "Nuevo contenido"
}

{
    "success": true
}

{
    "type": "error",
    "description": "Permission denied or disk full"
}

Endpoint: /IFileStorage/DeleteFile

Metodo HTTP: DELETE
Formato Serializacion: JSON
Estructura de datos IN:

{
    "path": "/documents/old.txt"
}

{
    "success": true
}

{
    "type": "error",
    "description": "File not found or cannot delete"
}
