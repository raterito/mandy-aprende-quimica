# Memoria del proyecto

## Objetivo

Construir un juego de química simple, amable y educativo para niños y familiares que usan PC, tablet Android o celular Android. Debe funcionar sin herramientas de compilación y poder publicarse como sitio estático.

## Estado actual

La aplicación está implementada únicamente con HTML, CSS y JavaScript. Incluye perfiles locales, los 118 elementos organizados en seis niveles, conceptos fundamentales, partidas de ocho rondas y selección adaptativa de preguntas.

## Decisiones de producto

- El perfil no debe interrumpir el juego: el último jugador se reactiva automáticamente.
- Si existe un jugador, la gestión de perfiles se reduce a un botón pequeño.
- La tabla usa la distribución periódica real cuando hay espacio y una cuadrícula compacta sin scroll horizontal bajo 960 px.
- La primera partida prioriza fundamentos: seis preguntas conceptuales y dos de elementos.
- La segunda y tercera partida usan cuatro preguntas conceptuales; después se mantienen dos como repaso.
- El dominio se almacena por `concept:<id>` y `element:<número>`.
- Los niveles cubren 1–20, 21–40, 41–60, 61–80, 81–100 y 101–118; se desbloquean con 80% de dominio en el bloque actual.
- Cada nivel posee seis temas teóricos propios. Los botones muestran el nivel vigente y agrupan lo anterior bajo «Temas anteriores».
- El dominio requerido para desbloquear incluye tanto los elementos como los seis conceptos del módulo.
- Las preguntas de elementos priorizan el bloque vigente y reservan una fracción para repasar niveles anteriores.
- Un acierto suma un nivel; un error resta dos. El rango es 0–5.
- La selección ponderada da peso 6 a contenido nuevo y peso 1 a contenido dominado. Lo dominado no desaparece por completo.
- Los datos permanecen en `localStorage`; todavía no existe sincronización entre dispositivos.

## Reglas para cambios futuros

- Trabajar y probar solamente en local. No crear commits, hacer `push` ni desplegar GitHub Pages hasta que el usuario diga explícitamente «publica».
- Mantener el proyecto ejecutable abriendo `index.html` directamente, salvo decisión explícita de migrar a otra arquitectura.
- Conservar compatibilidad con perfiles existentes y migrar datos cuando cambie su esquema.
- No introducir scroll horizontal en la página ni en la tabla en pantallas pequeñas.
- Tratar nombres de usuario con `textContent`; no interpolarlos mediante `innerHTML`.
- Bloquear respuestas múltiples y cancelar temporizadores al reiniciar.
- Dentro de una misma tanda, una pregunta respondida correctamente no debe volver a aparecer.
- La tanda contiene ocho preguntas originales: un error envía esa misma pregunta al final sin crear preguntas nuevas; si no queda ninguna otra, el repaso puede aparecer inmediatamente.
- La barra suma 12,5% cuando una pregunta original queda resuelta correctamente y no avanza con un error.
- Validar `script.js` con `node --check script.js` después de modificarlo.
- Mantener textos y archivos en UTF-8.
- Actualizar `CHANGELOG.md` cuando se agregue una función o cambie el comportamiento.

## Deuda y próximos hitos

- Crear manifest, service worker e iconos para convertirlo en PWA.
- Publicar con GitHub Pages y documentar la URL.
- Añadir pruebas unitarias del cálculo de dominio y la selección ponderada.
- Evaluar una pantalla de progreso detallado por tema.
- Enriquecer los datos educativos específicos de los elementos 21–118.

## Verificación manual mínima

1. Abrir sin perfiles: debe aparecer el alta de jugador.
2. Recargar con perfil: debe entrar automáticamente y mostrar solo el botón pequeño del perfil.
3. Completar una partida: debe guardar puntos, partidas y dominio.
4. Responder varias veces rápidamente: solo debe registrarse una respuesta.
5. Reiniciar durante una ronda: no debe reaparecer una pregunta del temporizador anterior.
6. Probar a 390, 620, 760 y 960 px: no debe existir scroll horizontal.
