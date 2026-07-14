# Brief de marca - Congreso Veterinario Limarí 2026

Fecha de actualización: 14 de julio de 2026.

## Fuentes revisadas

- Página oficial de venta indicada por el usuario en Fila Cero.
- Instagram oficial `@cvetlimari`.
- Capturas oficiales entregadas por el usuario.
- Archivo fotográfico entregado en `archivos nueva pag/todas`.
- Logos entregados en `archivos nueva pag/iconos auspiciadores`.

## Información comprobada

- Nombre: Congreso Veterinario Limarí / CVET Limarí 2026.
- Concepto: El Congreso de las Estrellas.
- Fecha: 12 y 13 de noviembre de 2026.
- Lugar: Casino Ovalle & Resort, Ovalle, Chile.
- Edición: cuarta versión.
- Contacto publicado: `cvetlimari@gmail.com`.
- Organizadores visibles en material oficial: Dr. Matías Morovic y Dr. Rodrigo Barraza.

## Dirección visual

La identidad combina un cielo nocturno profundo con azul institucional, celeste y cobre. La versión 2 reduce los recursos decorativos y utiliza fotografía documental real para comunicar comunidad, trayectoria y participación.

Paleta aplicada:

- Azul noche: `#061427`.
- Azul institucional: `#0B60C8`.
- Celeste: `#4FB5DE`.
- Cobre: `#D78F3D`.
- Coral de apoyo: `#E56959`.
- Papel claro: `#F4F8FB`.

Tipografías:

- Sora para títulos.
- Source Sans 3 para lectura.
- IBM Plex Mono para fechas, etiquetas y datos.

## Arquitectura de navegación

Se mantuvo la tecnología estática del proyecto porque no existía una necesidad técnica que justificara migrar a otro framework.

La antigua página continua se reemplazó por vistas independientes activadas desde el menú:

- Inicio.
- Congreso.
- Programa.
- Expositores.
- Recuerdos.
- Inscripción.

Cada ruta oculta las demás vistas, muestra el estado activo en el menú y conserva compatibilidad con la navegación del navegador. De esta manera el sitio deja de percibirse como una landing extensa.

## Fotografías incorporadas

Las imágenes se seleccionaron por claridad, composición y utilidad narrativa. Los originales se redimensionaron y comprimieron para web; no se incorporó el archivo fotográfico completo.

- `photos/hero-comunidad.jpg`: fotografía grupal real con la marca del congreso al fondo.
- `photos/auditorio.jpg`: asistentes durante una jornada.
- `photos/charla-magistral.jpg`: expositor en escenario.
- `photos/encuentro-marcas.jpg`: conversación en zona de stands.
- `photos/stands.jpg`: presencia de marcas y colaboradores.
- `photos/comunidad.jpg`: vínculo entre profesionales.
- `photos/escenario.jpg`: charla en desarrollo.
- `photos/participacion.jpg`: participación del público.
- `photos/casino-ovalle.jpg`: sede del encuentro.
- `photos/auspiciador-evento.jpg`: auspiciador presente en el congreso.

Los nombres originales identifican jornadas y bloques, pero no permiten asegurar el año de cada fotografía. Por esta razón la galería se presenta como “Recuerdos de nuestras ediciones” sin inventar fechas.

## Expositores

Se conservó el set editorial de la versión anterior, construido desde referencias oficiales entregadas por el usuario:

- César Villalta: emergencia y cuidados intensivos.
- Carlos Ruiz: anestesia y analgesia.
- Christel Cuneo: odontología veterinaria.
- Santiago Fuensalida: anestesiología y analgesia.
- Lina Sanz: medicina felina.
- Enzo Bosco: neurología.

Los títulos específicos de varias conferencias siguen pendientes de confirmación, por lo que no se inventaron descripciones adicionales.

## Auspiciadores y colaboradores

Se incorporaron los 16 logos entregados y se normalizaron visualmente dentro de contenedores de tamaño estable. La cinta:

- Se desplaza de derecha a izquierda.
- Repite el conjunto sin espacios vacíos.
- Avanza automáticamente y ofrece un control visible para pausarlo o reanudarlo.
- Mantiene el avance automático a menor velocidad cuando el visitante prefiere movimiento reducido.
- No inventa enlaces ni categorías individuales.

Marcas reconocibles en los archivos: Medvetarom, Biofresh, Jocaval, VET'S, Purina Pro Plan, IDEXX Agrovet, DataVet, Gerolamo, Drag Pharma, InsuFarma, MSD Animal Health, Veterinaria Roco, Vitanimal, Simona y Zoetis. El primer logo se mantiene identificado visualmente como C Vet según el archivo recibido.

## Inscripción y Fila Cero

Se eliminaron los montos y el flujo de pago interno. Las alternativas conservan únicamente información comprobable sobre lo que incluyen.

Todos los botones de inscripción obtienen su destino desde `SITE_CONFIG.filaCeroUrl` en `script.js`. Esto permite cambiar la dirección en un solo lugar si la organización actualiza la página oficial.

## Decisiones de accesibilidad y rendimiento

- Menú móvil con estado expandido.
- Estado activo visible y `aria-current`.
- Enlace para saltar al contenido.
- Paneles desplegables nativos para programa y preguntas frecuentes.
- Galería con navegación por teclado y texto alternativo.
- Movimiento respetuoso de `prefers-reduced-motion`.
- Fotografías con proporciones estables y carga diferida donde corresponde.
- Sin rutas locales, imágenes base64 ni dependencias innecesarias en el código final.

## Información pendiente

- Confirmación de los títulos finales de varias charlas.
- Posibles cambios de horario comunicados por la organización.
- Enlaces oficiales individuales de auspiciadores, si se decide hacer clicables los logos en el futuro.
