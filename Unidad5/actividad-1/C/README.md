Endpoint: /IAnalyticsService/TrackEvent

Metodo HTTP: POST
Formato Serializacion: JSON
Estructura de datos IN:

{
    "eventName": "user_login",
    "properties": {
        "user": "Alice",
        "device": "mobile"
    }
}

{
    "success": true
}

{
    "type": "error",
    "description": "Event tracking failed"
}

Endpoint: /IAnalyticsService/GetEventCount

Metodo HTTP: GET
Formato Serializacion: JSON
Estructura de datos IN:

{
    "eventName": "user_login"
}

{
    "eventName": "user_login",
    "count": 120
}

{
    "type": "error",
    "description": "Event not found"
}

Endpoint: /IAnalyticsService/GetTopEvents

Metodo HTTP: GET
Formato Serializacion: JSON
Estructura de datos IN:

{
    "limit": 3
}

{
    "events": {
        "user_login": 120,
        "item_view": 80,
        "purchase": 45
    }
}

{
    "type": "error",
    "description": "No events available"
}
