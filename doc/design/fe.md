# Decisiones Frontend

## 1. Frameworks / Herramientas consideradas

### React
Biblioteca muy popular de JavaScript enfocada en la construcción de interfaces de usuario reactivas. Tiene un ecosistema grande y es mantenida por Meta, con soporte para SPA y SSR a través de librerías como Next.js.

### Vue.js
Framework progresivo que combina reactividad con facilidad de integración. Es más ligero que Angular y tiene una curva de aprendizaje más suave, ideal para proyectos medianos o pequeños.

### Angular
Framework completo mantenido por Google. Ofrece una arquitectura muy estructurada, TypeScript por defecto y herramientas integradas para construir aplicaciones grandes y complejas de manera uniforme.

### Svelte (extra considerado)
Un framework relativamente nuevo que compila los componentes en JavaScript eficiente durante el build, logrando una huella mínima en tiempo de ejecución.

---

## 2. Ventajas y desventajas

| Opción     | Pros                                                                 | Contras                                                                 |
|------------|----------------------------------------------------------------------|-------------------------------------------------------------------------|
| **React**  | - Ecosistema enorme.<br> - Comunidad activa.<br> - Reutilización de componentes. | - Necesita configuración adicional para routing y estado.<br> - Curva de aprendizaje intermedia. |
| **Vue.js** | - Fácil de aprender.<br> - Reactividad simple.<br> - Buena integración progresiva. | - Comunidad más pequeña que React.<br> - Ecosistema menos maduro en algunos aspectos. |
| **Angular**| - Framework completo.<br> - Arquitectura sólida.<br> - Integración nativa con TypeScript. | - Curva de aprendizaje alta.<br> - Más pesado para proyectos pequeños.<br> - Boilerplate extenso. |
| **Svelte** | - Código ligero y optimizado.<br> - Menos código repetitivo.<br> - Muy buena performance. | - Comunidad más pequeña.<br> - Menos soporte en librerías y documentación. |

---

## 3. Decisión final

**Decisión:**  
Se usará **JavaScript, CSS y HTML** directamente, sin frameworks frontend complejos.

**Justificación:**  
- **Simplicidad:** evita la sobrecarga de un framework completo para un proyecto que no requiere interactividad masiva.  
- **Curva de aprendizaje:** Nuestro equipo no comprende del todo el apartado de front por lo que decidimos hacerlo de la manera más fácil.  
- **Agilidad:** permite avanzar más rápido en la construcción del prototipo/MVP.  
- **Flexibilidad futura:** si el proyecto crece, siempre se puede migrar a un framework (ej. React) en módulos específicos.  
- **Despliegue sencillo:** al ser solo JS/CSS/HTML, es más liviano y con menos dependencias.  

---
