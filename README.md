# Química en Juego

Juego educativo en español para aprender conceptos fundamentales de química y los primeros 20 elementos de la tabla periódica.

## Cómo jugar

No requiere instalación ni dependencias. Abre `index.html` en un navegador moderno.

1. Crea un jugador la primera vez.
2. Responde ocho preguntas por partida.
3. El juego guarda localmente el progreso y adapta las preguntas al dominio del jugador.

El último jugador queda activo al volver a abrir la página. La gestión de jugadores se encuentra en el botón pequeño con su nombre.

## Funciones actuales

- Seis preguntas introductorias sobre tabla periódica, número atómico, símbolos, grupos, períodos y familias.
- Preguntas de nombre, símbolo, número atómico y datos de los primeros 20 elementos.
- Selección adaptativa: aparecen más los contenidos nuevos o fallados y menos los dominados.
- Dominio individual de 0 a 5 por concepto y elemento.
- Perfiles locales, puntuación, rachas, progreso y resumen de errores.
- Tabla periódica por familias y diseño adaptable para PC, tablet y celular.
- Accesibilidad básica mediante teclado, foco visible y anuncios para lectores de pantalla.

## Persistencia

Los perfiles se guardan en `localStorage`. Cada navegador y dispositivo mantiene su propio progreso. Borrar los datos del navegador también elimina los perfiles.

Claves utilizadas:

- `chemistry-profiles-v2`
- `chemistry-active-profile`
- `chemistry-profiles` (solo migración desde la versión inicial)

## Estructura

- `index.html`: estructura de la interfaz.
- `styles.css`: diseño, tabla periódica y adaptación responsive.
- `script.js`: datos químicos, perfiles, preguntas y aprendizaje adaptativo.
- `AGENTS.md`: contexto técnico para futuras sesiones de desarrollo.
- `CHANGELOG.md`: historial de cambios.

## Comprobación rápida

```powershell
node --check script.js
```

## Próximos pasos sugeridos

1. Convertir el sitio en una PWA instalable y utilizable sin conexión.
2. Publicarlo mediante GitHub Pages.
3. Incorporar pruebas automatizadas para el motor adaptativo.
4. Ampliar gradualmente los elementos sin sobrecargar a principiantes.

## Privacidad

La versión actual no utiliza servidor, cuentas, analítica ni servicios externos. Los datos permanecen en el dispositivo del jugador.
