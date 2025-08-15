```gherkin
REQUISITOS FUNCIONALES EN NOTACION GHERKIN- MEDICLICK

@alta
Feature: RF-001 - Registro de EPS
  Como EPS
  Quiero registrarme en el sistema con mis datos básicos
  Para poder acceder y gestionar medicamentos

  Scenario: Registro exitoso de EPS
    Given que la EPS accede al formulario de registro
    When completa nombre, NIT, contacto y correo
    And confirma el envío
    Then el sistema guarda los datos en la base
    And muestra mensaje de confirmación

@alta
Feature: RF-002 - Inicio de sesión de EPS
  Como usuario de una EPS
  Quiero iniciar sesión con credenciales válidas
  Para acceder al sistema

  Scenario: Inicio de sesión válido
    Given que el usuario ingresa usuario y contraseña
    When las credenciales son correctas
    Then accede al panel principal

  Scenario: Inicio de sesión inválido
    Given que el usuario ingresa usuario y contraseña
    When las credenciales son incorrectas
    Then el sistema muestra mensaje de error

@alta
Feature: RF-003 - Registro de medicamentos
  Como EPS
  Quiero registrar medicamentos con nombre, cantidad y vencimiento
  Para mantener actualizado el inventario

  Scenario: Registro de un nuevo medicamento
    Given que el usuario accede al formulario de registro de medicamento
    When completa nombre, cantidad y fecha de vencimiento válidos
    And envía el formulario
    Then el medicamento se guarda en la base
    And se muestra confirmación de registro

@alta
Feature: RF-004 - Actualización de cantidad de medicamentos
  Como EPS
  Quiero actualizar la cantidad disponible de un medicamento
  Para reflejar el stock real

  Scenario: Actualizar stock
    Given que el usuario selecciona un medicamento existente
    When edita la cantidad
    And guarda los cambios
    Then el sistema actualiza la cantidad
    And muestra confirmación

@media
Feature: RF-005 - Eliminación de medicamentos
  Como EPS
  Quiero eliminar medicamentos del inventario
  Para mantener la base de datos limpia

  Scenario: Eliminar medicamento
    Given que el usuario selecciona un medicamento
    When presiona eliminar y confirma la acción
    Then el sistema elimina el medicamento de la base

@alta
Feature: RF-006 - Consulta pública de inventario
  Como visitante
  Quiero buscar medicamentos sin iniciar sesión
  Para conocer disponibilidad

  Scenario: Consulta pública
    Given que cualquier persona accede al buscador público
    When ingresa el nombre del medicamento
    Then el sistema muestra lista con EPS, cantidad y datos básicos

@media
Feature: RF-007 - Búsqueda filtrada de medicamentos
  Como usuario
  Quiero filtrar medicamentos por nombre o EPS
  Para encontrar resultados específicos

  Scenario: Búsqueda filtrada
    Given que el usuario accede al buscador avanzado
    When aplica filtros por nombre o EPS
    Then el sistema muestra resultados filtrados

@alta
Feature: RF-008 - Notificación de bajo stock
  Como EPS
  Quiero recibir avisos cuando un medicamento tenga pocas unidades
  Para actuar antes del desabastecimiento

  Scenario: Aviso por bajo stock
    Given que existe un valor mínimo configurado para un medicamento
    When la cantidad disponible es menor a ese valor
    Then el sistema muestra aviso de bajo stock

@media
Feature: RF-009 - Reporte básico de inventario
  Como EPS
  Quiero descargar un listado de medicamentos actuales
  Para llevar control externo

  Scenario: Descargar inventario
    Given que el usuario accede a la opción de descarga
    When solicita el reporte
    Then el sistema genera archivo Excel o CSV con nombre, cantidad y vencimiento

@media
Feature: RF-010 - Roles básicos
  Como administrador u operador
  Quiero tener permisos diferenciados
  Para controlar accesos

  Scenario: Permisos de administrador
    Given que el usuario tiene rol administrador
    Then puede agregar, editar y eliminar medicamentos

  Scenario: Permisos de operador
    Given que el usuario tiene rol operador
    Then puede agregar y editar medicamentos
    And no puede eliminar

@media
Feature: RF-011 - Historial de cambios
  Como usuario de la EPS
  Quiero guardar un registro de todas las acciones sobre medicamentos
  Para poder consultar un historial de movimientos

  Scenario: Registrar cambio en inventario
    Given que un usuario realiza una alta, baja o edición de un medicamento
    Then el sistema guarda fecha, usuario y acción realizada

  Scenario: Consultar historial
    Given que el usuario accede a la opción de historial
    Then el sistema muestra el registro de cambios

@media
Feature: RF-012 - Control de vencimiento
  Como usuario de la EPS
  Quiero recibir alertas cuando un medicamento esté próximo a vencer
  Para tomar acciones preventivas

  Scenario: Aviso por proximidad de vencimiento
    Given que un medicamento tiene fecha de vencimiento configurada
    When faltan menos de 30 días para su vencimiento
    Then el sistema muestra una alerta visible

@alta
Feature: RF-013 - Panel principal básico
  Como usuario del sistema
  Quiero ver en una pantalla principal el inventario de medicamentos
  Para tener una vista general rápida

  Scenario: Visualizar panel principal
    Given que el usuario accede al panel principal
    Then se muestra un listado de medicamentos y cantidades
    And cada medicamento tiene opción de editar o eliminar

@baja
Feature: RF-014 - Exportar historial
  Como usuario de la EPS
  Quiero descargar el historial de cambios en un archivo CSV
  Para llevar un registro externo

  Scenario: Descargar historial de cambios
    Given que el usuario accede a la opción de descarga del historial
    When solicita el archivo
    Then el sistema genera y entrega archivo en formato CSV

@baja
Feature: RF-015 - Importar lista inicial
  Como usuario de la EPS
  Quiero cargar medicamentos desde un archivo CSV
  Para iniciar el sistema con un inventario preexistente

  Scenario: Importar inventario inicial
    Given que el usuario selecciona un archivo CSV válido
    When lo carga en el sistema
    Then los medicamentos se agregan al inventario

@media
Feature: RF-016 - Edición de datos de perfil de EPS
  Como EPS
  Quiero actualizar mis datos de perfil
  Para mantener mi información de contacto al día

  Scenario: Actualizar perfil de EPS
    Given que el usuario accede al formulario de perfil
    When edita los datos (nombre, dirección, teléfono, correo)
    And guarda los cambios
    Then el sistema actualiza la información
    And muestra confirmación

@alta
Feature: RF-017 - Cerrar sesión
  Como usuario del sistema
  Quiero poder cerrar sesión de forma segura
  Para proteger mis datos y cuenta

  Scenario: Logout de usuario
    Given que el usuario presiona "Cerrar sesión"
    Then el sistema cierra la sesión
    And redirige a la página de inicio

@alta
Feature: RF-018 - Validación de datos en formularios
  Como usuario
  Quiero que el sistema valide los datos antes de guardarlos
  Para evitar errores en la información

  Scenario: Validar datos antes de guardar
    Given que el usuario completa un formulario
    When deja campos obligatorios vacíos, ingresa cantidades negativas o fechas inválidas
    Then el sistema muestra mensaje de error
    And no guarda la información

@media
Feature: RF-019 - Interfaz sencilla para búsqueda
  Como usuario
  Quiero un buscador visible siempre
  Para encontrar rápidamente medicamentos

  Scenario: Buscador rápido
    Given que el usuario ve el campo de búsqueda en la parte superior
    When ingresa texto
    Then el sistema muestra resultados instantáneos

@baja
Feature: RF-020 - Soporte básico
  Como usuario
  Quiero acceder a una sección de ayuda
  Para resolver dudas sobre el uso del sistema

  Scenario: Consultar sección de ayuda
    Given que el usuario accede a la sección de ayuda
    Then el sistema muestra preguntas frecuentes
    And muestra información de contacto para dudas
```