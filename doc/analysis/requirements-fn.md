# Requisitos Funcionales - Sistema de Inventario de Medicamentos EPS MEDICLICK

---

## RF-001 - Registro de EPS en el sistema
**Id:** REQ-001    
**Título:** Registro de EPS  
**Descripción:** Permitir que una EPS se registre en el sistema con datos básicos de identificación y contacto.  
**Criterios de aceptación:**
- Formulario con campos básicos (nombre, NIT, contacto, correo)  
- Botón para confirmar y enviar el registro  
- Guardado de datos en la base  
- Mensaje de confirmación de registro  
**Prioridad:** ALTA  

---

## RF-002 - Inicio de sesión de EPS
**Id:** REQ-002    
**Título:** Inicio de sesión  
**Descripción:** Permitir que usuarios de una EPS puedan acceder al sistema con usuario y contraseña.  
**Criterios de aceptación:**
- Formulario con usuario y contraseña  
- Validación de credenciales  
- Acceso al panel principal si son correctas  
- Mensaje de error si son incorrectas  
**Prioridad:** ALTA  

---

## RF-003 - Registro de medicamentos
**Id:** REQ-003    
**Título:** Agregar medicamento  
**Descripción:** Permitir a la EPS registrar medicamentos con nombre, cantidad y fecha de vencimiento.  
**Criterios de aceptación:**
- Formulario para nombre, cantidad y fecha de vencimiento  
- Validación de campos obligatorios  
- Guardado en la base de datos  
- Confirmación de registro exitoso  
**Prioridad:** ALTA  

---

## RF-004 - Actualización de cantidad de medicamentos
**Id:** REQ-004    
**Título:** Editar stock  
**Descripción:** Permitir que la EPS actualice la cantidad disponible de un medicamento.  
**Criterios de aceptación:**
- Selección de medicamento existente  
- Campo editable para cantidad  
- Guardado de cambios  
- Confirmación de actualización  
**Prioridad:** ALTA  

---

## RF-005 - Eliminación de medicamentos
**Id:** REQ-005    
**Título:** Eliminar medicamento  
**Descripción:** Permitir que la EPS elimine un medicamento del inventario.  
**Criterios de aceptación:**
- Selección del medicamento a eliminar  
- Botón de eliminar  
- Confirmación antes de borrar  
- Eliminación en la base de datos  
**Prioridad:** MEDIA  

---

## RF-006 - Consulta pública de inventario
**Id:** REQ-006    
**Título:** Búsqueda pública  
**Descripción:** Permitir a cualquier persona consultar la disponibilidad de medicamentos sin iniciar sesión.  
**Criterios de aceptación:**
- Campo de búsqueda por nombre  
- Lista de resultados con EPS y cantidad disponible  
- Información básica del medicamento  
- Interfaz accesible para todos  
**Prioridad:** ALTA  

---

## RF-007 - Búsqueda filtrada de medicamentos
**Id:** REQ-007    
**Título:** Filtros de búsqueda  
**Descripción:** Permitir filtrar medicamentos por nombre o EPS.  
**Criterios de aceptación:**
- Campos para filtrar por nombre o EPS  
- Botón de buscar  
- Resultados filtrados correctamente  
**Prioridad:** MEDIA  

---

## RF-008 - Notificación de bajo stock
**Id:** REQ-008    
**Título:** Aviso de desabastecimiento  
**Descripción:** Avisar a la EPS cuando un medicamento tenga pocas unidades disponibles.  
**Criterios de aceptación:**
- Configuración de un valor mínimo de stock  
- Comparación automática con cantidades disponibles  
- Aviso en pantalla si está bajo el mínimo  
**Prioridad:** ALTA  

---

## RF-009 - Reporte básico de inventario
**Id:** REQ-009    
**Título:** Reporte simple  
**Descripción:** Generar un listado de medicamentos actuales para descarga.  
**Criterios de aceptación:**
- Botón de “descargar inventario”  
- Generación en formato Excel o CSV  
- Inclusión de nombre, cantidad y fecha de vencimiento  
**Prioridad:** MEDIA  

---

## RF-010 - Roles básicos
**Id:** REQ-010    
**Título:** Permisos simples  
**Descripción:** Tener dos tipos de usuario: administrador y operador.  
**Criterios de aceptación:**
- Administrador puede agregar, editar y eliminar  
- Operador solo puede agregar y editar  
- Bloqueo de funciones no autorizadas  
**Prioridad:** MEDIA  

---

## RF-011 - Historial de cambios
**Id:** REQ-011    
**Título:** Registro simple de movimientos  
**Descripción:** Guardar un registro de altas, bajas y cambios en medicamentos.  
**Criterios de aceptación:**
- Guardar fecha, usuario y acción realizada  
- Posibilidad de consultar el historial  
**Prioridad:** MEDIA  

---

## RF-012 - Control de vencimiento
**Id:** REQ-012    
**Título:** Aviso de caducidad  
**Descripción:** Mostrar una alerta cuando un medicamento esté próximo a vencer.  
**Criterios de aceptación:**
- Comparar fecha de vencimiento con fecha actual  
- Mostrar en pantalla si faltan menos de 30 días  
**Prioridad:** MEDIA  

---

## RF-013 - Panel principal básico
**Id:** REQ-013    
**Título:** Vista general  
**Descripción:** Mostrar en una pantalla principal la lista de medicamentos y cantidades.  
**Criterios de aceptación:**
- Listado de medicamentos  
- Opción para editar o eliminar desde la lista  
**Prioridad:** ALTA  

---

## RF-014 - Exportar historial
**Id:** REQ-014    
**Título:** Descarga de cambios  
**Descripción:** Permitir descargar el historial de cambios en un archivo.  
**Criterios de aceptación:**
- Botón para descargar historial  
- Archivo en formato CSV  
**Prioridad:** BAJA  

---

## RF-015 - Importar lista inicial
**Id:** REQ-015    
**Título:** Carga inicial de inventario  
**Descripción:** Permitir cargar medicamentos desde un archivo CSV al iniciar el sistema.  
**Criterios de aceptación:**
- Selección de archivo  
- Validación de datos básicos  
- Agregado al inventario  
**Prioridad:** BAJA  

---

## RF-016 - Edición de datos de perfil de EPS
**Id:** REQ-016    
**Título:** Actualizar información de perfil  
**Descripción:** Permitir que la EPS actualice sus datos de contacto e información básica.  
**Criterios de aceptación:**
- Formulario editable con datos de perfil (nombre, dirección, teléfono, correo)  
- Botón para guardar cambios  
- Confirmación de actualización exitosa  
**Prioridad:** MEDIA  

---

## RF-017 - Cerrar sesión
**Id:** REQ-017    
**Título:** Logout  
**Descripción:** Permitir cerrar sesión de forma segura.  
**Criterios de aceptación:**
- Botón de cerrar sesión  
- Redirección a la página de inicio  
**Prioridad:** ALTA  

---

## RF-018 - Validación de datos en formularios
**Id:** REQ-018    
**Título:** Datos correctos  
**Descripción:** Validar que los datos ingresados sean correctos antes de guardarlos.  
**Criterios de aceptación:**
- Campos obligatorios no vacíos  
- Cantidad numérica positiva  
- Fechas válidas  
**Prioridad:** ALTA  

---

## RF-019 - Interfaz sencilla para búsqueda
**Id:** REQ-019    
**Título:** Buscador rápido  
**Descripción:** Tener un buscador visible en todo momento para encontrar medicamentos.  
**Criterios de aceptación:**
- Campo de búsqueda en la parte superior  
- Resultados instantáneos  
**Prioridad:** MEDIA  

---

## RF-020 - Soporte básico
**Id:** REQ-020    
**Título:** Ayuda en línea  
**Descripción:** Tener una sección con instrucciones simples de uso.  
**Criterios de aceptación:**
- Página con preguntas frecuentes  
- Información de contacto para dudas  
**Prioridad:** BAJA

---

# Requisitos No Funcionales - Sistema de Inventario de Medicamentos EPS MEDICLICK


---
RNF-001 – Disponibilidad del sistema

Id: RNF-001
Título: Disponibilidad del sistema
Descripción: El sistema debe estar disponible al menos el 99 % del tiempo durante el horario laboral (7:00 a. m. – 9:00 p. m.), salvo mantenimientos programados.
Criterios de aceptación:

Monitoreo continuo de disponibilidad.

Registro de tiempos de inactividad.

Notificación previa de mantenimientos.
Prioridad: ALTA
---
RNF-002 – Rendimiento de respuesta

Id: RNF-002
Título: Tiempo de respuesta
Descripción: El sistema debe responder a cualquier consulta o acción del usuario en menos de 3 segundos para inventarios de hasta 10.000 registros.
Criterios de aceptación:

Medición de tiempo de respuesta en pruebas de carga.

Soporte fluido con base de datos de gran tamaño.
Prioridad: ALTA

---

RNF-003 – Escalabilidad

Id: RNF-003
Título: Escalabilidad del sistema
Descripción: La arquitectura debe permitir aumentar la capacidad de almacenamiento y procesamiento sin rediseñar el sistema, soportando el crecimiento de datos y usuarios.
Criterios de aceptación:

Pruebas con incremento progresivo de datos y usuarios.

Implementación modular que permita ampliaciones.
Prioridad: MEDIA

---

RNF-004 – Seguridad de datos

Id: RNF-004
Título: Protección de datos sensibles
Descripción: Toda la comunicación y almacenamiento de datos sensibles debe estar protegida con cifrado SSL/TLS y contraseñas encriptadas.
Criterios de aceptación:

Certificado SSL activo.

Contraseñas cifradas con algoritmo seguro.

Pruebas de penetración superadas.
Prioridad: ALTA

---

RNF-005 – Compatibilidad multiplataforma

Id: RNF-005
Título: Compatibilidad en navegadores y dispositivos
Descripción: El sistema debe ser accesible desde los principales navegadores web (Chrome, Firefox, Edge) y dispositivos móviles con pantallas de al menos 5 pulgadas.
Criterios de aceptación:

Pruebas en navegadores y dispositivos indicados.

Ajuste responsive de interfaz.
Prioridad: MEDIA
