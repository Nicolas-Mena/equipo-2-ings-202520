# Decisiones Backend

## 1. Frameworks / Herramientas consideradas

### Express.js (Node.js)
Framework minimalista para Node.js que facilita la construcción de servidores HTTP y APIs REST. Es el más popular en el ecosistema JavaScript y tiene una gran cantidad de middleware disponible.

### Koa.js
Framework creado por los mismos desarrolladores de Express, más moderno y con mejor soporte nativo para `async/await`. Promueve un enfoque modular y limpio para construir servidores.

### NestJS
Framework basado en Node.js y TypeScript con una arquitectura modular, inyección de dependencias y soporte integrado para pruebas, escalabilidad y microservicios.

### Django (extra considerado)
Framework completo de Python que incluye ORM, panel de administración y módulos listos para usar. Ideal para aplicaciones complejas que requieren rapidez de desarrollo y buenas prácticas de seguridad desde el inicio.

---

## 2. Ventajas y desventajas

| Opción        | Pros                                                                 | Contras                                                                 |
|---------------|----------------------------------------------------------------------|-------------------------------------------------------------------------|
| **Express.js**| - Popular y con gran documentación.<br> - Ligero y flexible.<br> - Muchos middleware disponibles. | - Pocas reglas de estructura por defecto.<br> - Fácil caer en desorden si no se aplican buenas prácticas. |
| **Koa.js**    | - Uso moderno de async/await.<br> - Código más limpio.<br> - Modularidad clara. | - Comunidad más pequeña.<br> - Menos ejemplos y recursos que Express. |
| **NestJS**    | - Arquitectura robusta.<br> - Inyección de dependencias.<br> - Excelente para proyectos grandes. | - Curva de aprendizaje alta.<br> - Puede ser demasiado complejo para proyectos pequeños. |
| **Django**    | - Framework completo “batteries included”.<br> - Seguridad integrada.<br> - Ideal para aplicaciones con lógica compleja. | - No es JavaScript: requiere aprender Python.<br> - Más pesado si solo se necesita una API ligera. |

---

## 3. Decisión final

**Decisión:**  
Se usará **Node.js con Express.js** como backend, junto a **PostgreSQL** como base de datos.

**Justificación:**  
- **Consistencia de lenguaje:** usar JavaScript tanto en frontend como en backend unifica el stack, facilitando el desarrollo.  
- **Agilidad:** Express es liviano y permite construir APIs rápidamente, ideal para un MVP.  
- **Comunidad y soporte:** hay abundante documentación y middleware disponible para necesidades comunes (auth, seguridad, validación).  
- **Escalabilidad:** se puede estructurar el código en módulos y escalar según las necesidades del proyecto.  
- **PostgreSQL:** ofrece robustez, integridad relacional y soporte para transacciones complejas, siendo una de las bases de datos más confiables y utilizadas en la industria.  

---
