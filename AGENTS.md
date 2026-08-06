# Memoria del proyecto

## Objetivo

Construir un juego de química simple, amable y educativo para niños y familiares que usan PC, tablet Android o celular Android. Debe funcionar sin herramientas de compilación y poder publicarse como sitio estático.

## Estado actual

La aplicación está implementada únicamente con HTML, CSS y JavaScript. Incluye perfiles locales, primeros 20 elementos, conceptos fundamentales, partidas de ocho rondas y selección adaptativa de preguntas.

## Decisiones de producto

- El perfil no debe interrumpir el juego: el último jugador se reactiva automáticamente.
- Si existe un jugador, la gestión de perfiles se reduce a un botón pequeño.
- La tabla usa la distribución periódica real cuando hay espacio y una cuadrícula compacta sin scroll horizontal bajo 960 px.
- La primera partida prioriza fundamentos: seis preguntas conceptuales y dos de elementos.
- La segunda y tercera partida usan cuatro preguntas conceptuales; después se mantienen dos como repaso.
- El dominio se almacena por `concept:<id>` y `element:<número>`.
- Un acierto suma un nivel; un error resta dos. El rango es 0–5.
- La selección ponderada da peso 6 a contenido nuevo y peso 1 a contenido dominado. Lo dominado no desaparece por completo.
- Los datos permanecen en `localStorage`; todavía no existe sincronización entre dispositivos.

## Reglas para cambios futuros

- Mantener el proyecto ejecutable abriendo `index.html` directamente, salvo decisión explícita de migrar a otra arquitectura.
- Conservar compatibilidad con perfiles existentes y migrar datos cuando cambie su esquema.
- No introducir scroll horizontal en la página ni en la tabla en pantallas pequeñas.
- Tratar nombres de usuario con `textContent`; no interpolarlos mediante `innerHTML`.
- Bloquear respuestas múltiples y cancelar temporizadores al reiniciar.
- Validar `script.js` con `node --check script.js` después de modificarlo.
- Mantener textos y archivos en UTF-8.
- Actualizar `CHANGELOG.md` cuando se agregue una función o cambie el comportamiento.

## Deuda y próximos hitos

- Crear manifest, service worker e iconos para convertirlo en PWA.
- Publicar con GitHub Pages y documentar la URL.
- Añadir pruebas unitarias del cálculo de dominio y la selección ponderada.
- Evaluar una pantalla de progreso detallado por tema.
- Ampliar la tabla por etapas, desbloqueando nuevos elementos según dominio.

## Verificación manual mínima

1. Abrir sin perfiles: debe aparecer el alta de jugador.
2. Recargar con perfil: debe entrar automáticamente y mostrar solo el botón pequeño del perfil.
3. Completar una partida: debe guardar puntos, partidas y dominio.
4. Responder varias veces rápidamente: solo debe registrarse una respuesta.
5. Reiniciar durante una ronda: no debe reaparecer una pregunta del temporizador anterior.
6. Probar a 390, 620, 760 y 960 px: no debe existir scroll horizontal.
