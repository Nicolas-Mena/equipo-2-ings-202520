# Base de datos - Inventario de Medicamentos por EPS

Este proyecto utiliza PostgreSQL como base de datos relacional.  
El archivo [`script.sql`](./script.sql) contiene todo lo necesario para crear la estructura del sistema y cargar los datos iniciales.

---

## Requisitos previos

Antes de ejecutar el script asegúrate de tener instalado:

- PostgreSQL (https://www.postgresql.org/download/)
- Un usuario con permisos para crear bases de datos (por defecto: postgres)

---

## Ejecución del script

### Opción 1: Desde pgAdmin

1. Abre pgAdmin y conéctate a tu servidor local.  
2. Crea una nueva base de datos llamada `inventario_eps`.  
3. En el panel izquierdo, selecciona esa base → clic derecho → **Query Tool**.  
4. Abre o copia el contenido de [`script.sql`](./script.sql).  
5. Ejecútalo con el botón de ejecutar (▶️).

Esto creará todas las tablas, relaciones e insertará las EPS y medicamentos iniciales con cantidad 0.

---

### Opción 2: Desde la terminal psql

Ubícate en la carpeta raíz del proyecto y ejecuta:

```bash
psql -U postgres -h localhost -f ./database/script.sql