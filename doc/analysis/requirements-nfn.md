```gherkin
REQUISITOS NO FUNCIONALES EN NOTACION GHERKIN - MEDICLICK

@alta
Feature: RNF-001 - Disponibilidad del sistema
  Como usuario del sistema
  Quiero que el sistema esté disponible al menos el 99% del tiempo en horario laboral
  Para garantizar el acceso constante

  Scenario: Verificar disponibilidad en horario laboral
    Given que el sistema está en funcionamiento
    When es entre las 7:00 a.m. y 9:00 p.m.
    Then el sistema debe estar disponible al menos el 99% del tiempo

@alta
Feature: RNF-002 - Rendimiento de respuesta
  Como usuario del sistema
  Quiero que las consultas y acciones sean rápidas
  Para no perder tiempo en mis tareas

  Scenario: Respuesta en tiempo óptimo
    Given que un usuario realiza una consulta o acción
    When el inventario contiene hasta 10,000 registros
    Then el sistema responde en menos de 3 segundos

@media
Feature: RNF-003 - Escalabilidad del sistema
  Como administrador del sistema
  Quiero que la arquitectura permita aumentar capacidad
  Para soportar el crecimiento de datos y usuarios

  Scenario: Ampliación de capacidad
    Given que aumenta la cantidad de datos y usuarios
    When se requiere más almacenamiento o procesamiento
    Then el sistema permite ampliar capacidad sin rediseñar la arquitectura

@alta
Feature: RNF-004 - Seguridad de datos
  Como usuario del sistema
  Quiero que mis datos estén protegidos
  Para evitar accesos no autorizados

  Scenario: Cifrado de datos sensibles
    Given que se envía o almacena información sensible
    When se procesa en el sistema
    Then los datos están cifrados con SSL/TLS y contraseñas encriptadas

@media
Feature: RNF-005 - Compatibilidad multiplataforma
  Como usuario del sistema
  Quiero acceder desde diferentes navegadores y dispositivos
  Para usarlo sin importar mi equipo

  Scenario: Acceso multiplataforma
    Given que un usuario accede al sistema
    When lo hace desde Chrome, Firefox o Edge en PC o dispositivo móvil de 5" o más
    Then la interfaz es completamente funcional y responsiva

@media
Feature: RNF-006 - Usabilidad
  Como nuevo usuario
  Quiero que la interfaz sea intuitiva
  Para aprender a usar el sistema rápidamente

  Scenario: Completar tareas sin capacitación
    Given que un usuario nuevo intenta registrar o buscar un medicamento
    When utiliza la interfaz
    Then completa la tarea en menos de 10 minutos sin capacitación formal

@media
Feature: RNF-007 - Mantenibilidad
  Como administrador del sistema
  Quiero que el sistema sea fácil de mantener
  Para minimizar tiempos de inactividad

  Scenario: Actualización con mínima interrupción
    Given que se requiere una actualización o corrección
    When se implementa el cambio
    Then la interrupción del servicio no supera los 30 minutos
    And existe documentación actualizada

@alta
Feature: RNF-008 - Respaldo y recuperación
  Como administrador del sistema
  Quiero contar con copias de seguridad diarias
  Para recuperar información en caso de fallo

  Scenario: Restauración de datos
    Given que ocurre una pérdida de datos
    When se restaura la copia de seguridad diaria
    Then la información se recupera completamente en menos de 1 hora

@alta
Feature: RNF-009 - Cumplimiento normativo
  Como administrador del sistema
  Quiero cumplir con la Ley 1581 de 2012
  Para proteger datos personales de los usuarios

  Scenario: Manejo seguro de datos personales
    Given que el sistema gestiona datos personales
    When se registran, almacenan o procesan
    Then se cumple con la Ley 1581 de 2012 de protección de datos personales en Colombia

@media
Feature: RNF-010 - Tolerancia a fallos
  Como usuario del sistema
  Quiero que el sistema siga funcionando si falla un módulo
  Para no interrumpir mi trabajo

  Scenario: Fallo aislado sin afectar el sistema
    Given que un módulo presenta una falla
    When los usuarios siguen trabajando
    Then el resto de módulos funciona normalmente
    And se muestra mensaje de error claro
```