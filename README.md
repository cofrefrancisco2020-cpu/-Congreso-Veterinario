# Congreso Veterinario Limarí 2026 - Versión 2

Sitio estático navegable para CVET Limarí 2026. Esta versión conserva `versión 1` sin cambios y reorganiza el contenido en vistas independientes controladas desde el menú superior.

## Navegación

El sitio utiliza rutas con hash para ofrecer una experiencia de varias secciones sin incorporar un framework innecesario:

- `#inicio`
- `#congreso`
- `#programa`
- `#expositores`
- `#recuerdos`
- `#inscripcion`

Solo una vista permanece visible a la vez. El estado activo se muestra en el menú y la navegación funciona con los controles atrás/adelante del navegador.

## Archivos principales

- `index.html`: contenido, vistas y estructura accesible.
- `styles.css`: identidad visual, diseño responsive y animaciones.
- `script.js`: navegación, menú móvil, cuenta regresiva, galería, animaciones y enlace centralizado a Fila Cero.
- `brief-marca.md`: fuentes, decisiones visuales y selección de recursos.
- `assets/photos/`: fotografías documentales optimizadas.
- `assets/sponsors/`: logos de auspiciadores y colaboradores.
- `assets/speaker-ai-*.jpg`: retratos editoriales de expositores heredados de la primera versión.

## Inscripción

Todos los llamados de inscripción se configuran desde una sola propiedad en `script.js`:

```js
SITE_CONFIG.filaCeroUrl
```

El sitio no procesa pagos. La inscripción y compra se completan en la página oficial del evento en Fila Cero.

## Ejecución local

Puede abrirse con un servidor web estático. Por ejemplo:

```powershell
python -m http.server 8017
```

Luego se visita `http://127.0.0.1:8017/`.

## Criterios de rendimiento

- Fotografías seleccionadas y redimensionadas para uso web.
- Imágenes secundarias con carga diferida.
- Sin dependencias de aplicación ni proceso de compilación.
- Movimiento reducido cuando el sistema del visitante solicita `prefers-reduced-motion`.
- Carrusel automático de logos con control para pausar o reanudar; en modo de movimiento reducido avanza más despacio.
