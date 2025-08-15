Feature: Requisitos No Funcionales - Sistema de Inventario de Medicamentos EPS MEDICLICK

  Scenario: RNF-001 - Disponibilidad del sistema
    Given que el sistema está en funcionamiento
    When es horario laboral entre las 7:00 a.m. y 9:00 p.m.
    Then el sistema debe estar disponible al menos el 99% del tiempo
    And Prioridad: ALTA

  Scenario: RNF-002 - Rendimiento de respuesta
    Given que un usuario realiza una consulta o acción
    When el inventario contiene hasta 10,000 registros
    Then el sistema debe responder en menos de 3 segundos
    And Prioridad: ALTA

  Scenario: RNF-003 - Escalabilidad del sistema
    Given que la EPS aumenta la cantidad de datos y usuarios
    When se requiera ampliar la capacidad de almacenamiento o procesamiento
    Then el sistema debe permitirlo sin rediseñar su arquitectura
    And Prioridad: MEDIA

  Scenario: RNF-004 - Seguridad de datos
    Given que un usuario envía o recibe información sensible
    When se almacena o transmite dicha información
    Then debe estar cifrada mediante SSL/TLS y contraseñas encriptadas
    And Prioridad: ALTA

  Scenario: RNF-005 - Compatibilidad multiplataforma
    Given que un usuario accede al sistema
    When lo hace desde Chrome, Firefox o Edge en PC o dispositivo móvil de 5" o más
    Then la interfaz debe ser completamente funcional y responsiva
    And Prioridad: MEDIA

  Scenario: RNF-006 - Usabilidad
    Given que un usuario nunca ha usado el sistema
    When intenta registrar o buscar un medicamento
    Then debe poder completar la tarea en menos de 10 minutos sin capacitación formal
    And Prioridad: MEDIA

  Scenario: RNF-007 - Mantenibilidad
    Given que se requiere una actualización o corrección en el sistema
    When se implemente el cambio
    Then la interrupción del servicio no debe superar los 30 minutos y debe haber documentación actualizada
    And Prioridad: MEDIA

  Scenario: RNF-008 - Respaldo y recuperación
    Given que se produce una pérdida de datos
    When se restaura la copia de seguridad diaria
    Then la información debe recuperarse completamente en menos de 1 hora
    And Prioridad: ALTA

  Scenario: RNF-009 - Cumplimiento normativo
    Given que el sistema gestiona datos personales
    When se registren, almacenen o procesen
    Then se debe cumplir con la Ley 1581 de 2012 de protección de datos personales en Colombia
    And Prioridad: ALTA

  Scenario: RNF-010 - Tolerancia a fallos
    Given que un módulo del sistema presenta una falla
    When los usuarios continúan trabajando
    Then el resto de módulos debe seguir operativo y mostrar mensajes de error claros
    And Prioridad: MEDIA
