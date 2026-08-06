# Historial de cambios

Los cambios importantes del proyecto se registran en este archivo.

## [Sin publicar]

### Cambiado

- El juego ahora se llama «Mandy aprende Química» y utiliza un icono vectorial de una niña con pelo negro.
- Cabecera y gestión de perfiles más compactas para que el juego aparezca antes en pantalla.
- La tabla se oculta al comenzar; consultarla durante una pregunta reduce a la mitad los puntos de ese acierto.
- Se añadió una guía consultable con toda la información conceptual utilizada en las preguntas básicas.
- La tarjeta de desafío permanece oculta hasta comenzar una partida, eliminando instrucciones redundantes.
- El indicador de dominio incluye una explicación emergente y una etiqueta accesible.
- Las respuestas incorrectas permanecen visibles más tiempo para poder leer la solución.
- Cada elemento abre una ficha emergente con todos los datos utilizados por el juego.
- En la tabla compacta, símbolo y nombre dejan más espacio al número atómico.
- Se aumentó nuevamente la separación para evitar cruces con números atómicos de tres cifras.
- La guía de conceptos básicos utiliza las mismas ventanas emergentes que las fichas de elementos.
- Ocultar la tabla oculta también el encabezado de exploración, las instrucciones y la guía conceptual.
- El control «Mostrar/Ocultar información» aparece solamente después de comenzar una partida.
- La presentación ahora refleja la progresión completa hasta los 118 elementos.
- El rango de cada nivel se presenta entre comillas como nombre del módulo.

### Añadido

- Seis niveles progresivos que desbloquean gradualmente los 118 elementos al alcanzar 80% de dominio por bloque.
- Panel visible con nivel actual, avance del bloque y cantidad de niveles pendientes.
- Repaso adaptativo de elementos pertenecientes a niveles anteriores.

### Pendiente

- Aplicación web instalable y funcionamiento sin conexión.
- Publicación en GitHub Pages.

## [0.3.0] - 2026-08-06

### Añadido

- Seis preguntas sobre fundamentos de la tabla periódica.
- Seguimiento del dominio por concepto y elemento.
- Selección adaptativa que prioriza contenidos nuevos o fallados.
- Indicador de dominio global por jugador.

### Cambiado

- La primera partida comienza con fundamentos antes de priorizar elementos.
- Reiniciar el progreso borra también el dominio acumulado.

## [0.2.0] - 2026-08-05

### Añadido

- Perfiles persistentes y reactivación automática del último jugador.
- Gestión compacta para cambiar, reiniciar o eliminar jugadores.
- Tabla periódica con familias y posición real de los primeros 20 elementos.
- Preguntas variadas, rachas, bonificación, progreso y resumen final.
- Mejoras de accesibilidad y diseño móvil.

### Corregido

- Caracteres y emojis dañados por codificación.
- Respuestas múltiples durante el temporizador.
- Preguntas repetidas dentro de una partida.
- Temporizadores pendientes al reiniciar.
- Desplazamiento horizontal de la tabla en pantallas estrechas.
- Inserción insegura de nombres mediante HTML.

## [0.1.0] - 2026-08-05

### Añadido

- Primera versión con perfiles, 20 elementos y preguntas de símbolo a nombre.
