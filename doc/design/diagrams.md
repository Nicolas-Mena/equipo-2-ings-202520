## Diagrama de modelo relacional
```mermaid
erDiagram
    EPS {
        int eps_id PK
        string nombre
        string nit
        string email
        string password
    }

    MEDICAMENTOS {
        int medicamento_id PK
        string nombre
        string descripcion
    }

    INVENTARIO {
        int inventario_id PK
        int eps_id FK
        int medicamento_id FK
        int cantidad_disponible
        datetime fecha_actualizacion
    }

    EPS ||--o{ INVENTARIO : "gestiona"
    MEDICAMENTOS ||--o{ INVENTARIO : "pertenece a"
```
    
## Diagrama Ad Hoc
<img width="735" height="653" alt="Image" src="https://github.com/user-attachments/assets/c18dd533-d9ee-4de1-aaff-7a8d2bc746c4" />

## Diagrama de casos de uso
<img width="732" height="709" alt="Image" src="https://github.com/user-attachments/assets/2982e9c6-aade-4e5d-9830-693044e9398f" />

## Diagrama de secuencia de todos los casos de uso 
<img width="1091" height="649" alt="Captura de pantalla 2025-09-16 233003" src="https://github.com/user-attachments/assets/a864af72-3c2d-4920-863b-c2aa629703bc" />

<img width="914" height="667" alt="Captura de pantalla 2025-09-16 233040" src="https://github.com/user-attachments/assets/bd2df2fb-b397-41b4-b1a8-48da61d27e06" />

<img width="999" height="564" alt="Captura de pantalla 2025-09-16 233059" src="https://github.com/user-attachments/assets/bce56fa0-c098-4dd3-b060-79d17946f36a" />

<img width="1278" height="577" alt="Captura de pantalla 2025-09-16 233108" src="https://github.com/user-attachments/assets/1107355e-cd78-4223-9036-50759ff63763" />

<img width="1039" height="574" alt="Captura de pantalla 2025-09-16 233130" src="https://github.com/user-attachments/assets/f9e552ff-7d3e-4191-8092-cd9caf8390f7" />

## Diagrama de componentes
<img width="566" height="364" alt="Diagrama componentes drawio" src="https://github.com/user-attachments/assets/406a8c7b-49e1-405a-a6be-2e53fbe8c57c" />
