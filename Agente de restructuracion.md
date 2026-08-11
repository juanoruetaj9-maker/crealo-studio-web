# RESTRUCTURACIÓN 3 — Sistema de Plantillas Crealo
> Agente de reestructuración · Dirección Estratégica SMV
> Continuación de restructuracion.md y restructuracion-2-paginas-paquete.md

---

## 0. DECISIÓN ESTRATÉGICA QUE ORIGINA ESTE BRIEF

Se evaluó competir contra Invitio (plataforma self-service: editor visual, cuentas de usuario, pago automático, 100K+ eventos, apps móviles). **Se descartó.** Requiere 3–6 meses de desarrollo y se compite en su cancha: precio bajo y automatización.

**Modelo elegido:** Galería de plantillas navegable + venta asistida por WhatsApp.

| Invitio | Crealo |
|---|---|
| El cliente edita solo | Crealo lo hace por él |
| Plantilla genérica compartida por miles | Diseño personalizado único |
| Soporte L–V 9–18h | Trato directo con el fundador |
| "Lista en minutos" | "Demo en 24 horas, hecho para ti" |
| Pago y te las arreglas | Acompañamiento de inicio a fin |

**Función de la galería:** No es un editor. Es un **lenguaje visual común** para que el cliente pueda decir "quiero ESA" en lugar de describir con palabras lo que imagina. Reduce fricción de venta, no automatiza producción.

**Regla de oro de este brief:** Ninguna funcionalidad que requiera cuentas de usuario, editor de contenido, base de datos de clientes o pasarela de pagos. Todo es estático y se resuelve por WhatsApp.

---

## 1. CONTEXTO TÉCNICO

- **Repo:** `crealo-studio-web`
- **Stack:** React + Vite + JavaScript + Tailwind CSS + React Router
- **Deploy:** Vercel
- **Rama de trabajo:** `feature/galeria-plantillas`
- **Fuente de verdad de paquetes:** `/src/data/paquetes.js` (ya existe, no duplicar)
- **Componentes demo existentes:** `/src/components/demo/` (9 componentes, reutilizar)
- **WhatsApp:** 529932228936

### Regla de proceso obligatoria
Generar **preview en Vercel** al finalizar cada fase. Reportar al fundador. **Esperar aprobación explícita antes de mergear a `main`.** No repetir el merge directo de la sesión anterior.

---

## 2. ARQUITECTURA DE DATOS

### 2.1 Nuevo archivo: `/src/data/plantillas.js`

Única fuente de verdad de todas las plantillas. Estructura:

```js
export const ESTILOS = [
  { id: 'elegante',    nombre: 'Elegante',     descripcion: 'Serif clásica, tonos neutros, formal' },
  { id: 'moderno',     nombre: 'Moderno',      descripcion: 'Sans-serif, geométrico, alto contraste' },
  { id: 'floral',      nombre: 'Floral',       descripcion: 'Ilustración botánica, tonos suaves' },
  { id: 'minimalista', nombre: 'Minimalista',  descripcion: 'Espacio en blanco, tipografía protagonista' },
  { id: 'romantico',   nombre: 'Romántico',    descripcion: 'Acuarela, cursivas, rosas y durazno' },
  { id: 'nocturno',    nombre: 'Nocturno',     descripcion: 'Fondos oscuros, dorado, alto impacto' },
  { id: 'tropical',    nombre: 'Tropical',     descripcion: 'Palmas, verdes vivos, destino playa' },
  { id: 'vintage',     nombre: 'Vintage',      descripcion: 'Texturas de papel, sepia, retro' },
];

export const EVENTOS = [
  { id: 'boda',        nombre: 'Boda',                 icono: 'Heart' },
  { id: 'xv',          nombre: 'XV Años',              icono: 'Crown' },
  { id: 'babyshower',  nombre: 'Baby Shower',          icono: 'Baby' },
  { id: 'cumpleanos',  nombre: 'Cumpleaños Especial',  icono: 'PartyPopper' },
];

export const PLANTILLAS = [
  {
    id: 'ax-001',
    nombre: 'Aurora',
    estilo: 'elegante',
    eventos: ['boda'],                 // en qué eventos aplica
    paletaPrincipal: '#C9A227',
    paletaSecundaria: '#FAF7F2',
    tipografiaTitulo: 'Playfair Display',
    tipografiaCuerpo: 'Inter',
    portada: 'URL_UNSPLASH',           // imagen de referencia
    galeria: ['URL_1', 'URL_2'],       // vistas adicionales
    disponibleEn: ['esencial','premium','experiencia'],
    destacada: true,
    descripcion: 'Dorado sobre marfil, tipografía serif de alto contraste.',
  },
  // ... mínimo 12 plantillas
];
```

### 2.2 Reglas de datos
- **Mínimo 12 plantillas** distribuidas entre los 4 eventos y los 8 estilos
- Cada evento debe tener **al menos 3 plantillas** disponibles
- No hardcodear plantillas dentro de componentes JSX
- Los precios NO viven aquí — siguen en `paquetes.js`
- Cada plantilla debe tener `id` único e inmutable (se usa en el link de WhatsApp)

### 2.3 Helper obligatorio
```js
// Genera el link de WhatsApp con contexto completo
export function buildPlantillaWhatsappLink({ plantillaId, plantillaNombre, eventoNombre, paqueteNombre }) {
  // Mensaje: "Hola, vi la plantilla [NOMBRE] (ref: [ID]) para mi [EVENTO].
  //           Me interesa el paquete [PAQUETE]. ¿Me pueden dar más información?"
}
```
El `id` de la plantilla en el mensaje es crítico: es cómo el fundador sabe exactamente qué vio el cliente.

---

## 3. FASES DE EJECUCIÓN

---

### FASE 1 — Cimientos de datos y ruteo
**Objetivo:** Que exista la estructura antes de cualquier pixel.

**Tareas:**
1. Crear `/src/data/plantillas.js` con `ESTILOS`, `EVENTOS`, `PLANTILLAS` (12 mínimo) y `buildPlantillaWhatsappLink()`
2. Registrar nuevas rutas en el router:
   - `/plantillas` — galería completa
   - `/plantillas/:estilo` — galería filtrada por estilo
   - `/plantillas/detalle/:id` — detalle de una plantilla
3. Agregar "Plantillas" al Navbar principal, entre "Servicios" y "Portafolio"
4. Crear archivos placeholder de las 3 páginas nuevas (solo esqueleto, sin diseño)

**Criterio de aceptación:**
- Las 3 rutas cargan sin error
- `plantillas.js` exporta los 12 registros completos
- "Plantillas" visible en Navbar y navega correctamente

**No hacer en esta fase:** diseño visual, imágenes finales, animaciones.

---

### FASE 2 — Galería principal `/plantillas`
**Objetivo:** El cliente ve todo el catálogo y puede filtrar.

**Estructura de la página:**

```
┌────────────────────────────────────────────────┐
│ HERO DE SECCIÓN                                │
│ "Encuentra el estilo de tu evento"             │
│ "Elige la plantilla que te enamore. Nosotros   │
│  la personalizamos con tus datos, tus fotos    │
│  y tus colores."                               │
│                                                │
│ [Ver cómo funciona ↓]                          │
├────────────────────────────────────────────────┤
│ FILTROS                                        │
│ Por evento:  [Todos][Boda][XV][Baby][Cumple]   │
│ Por estilo:  [Todos][Elegante][Moderno]...     │
│ (chips/pills, no dropdowns)                    │
├────────────────────────────────────────────────┤
│ GRID DE PLANTILLAS                             │
│ ┌────────┐ ┌────────┐ ┌────────┐              │
│ │ imagen │ │ imagen │ │ imagen │              │
│ │ Aurora │ │ Bosque │ │ Lino   │              │
│ │Elegante│ │ Floral │ │ Minim. │              │
│ │[Ver →] │ │[Ver →] │ │[Ver →] │              │
│ └────────┘ └────────┘ └────────┘              │
│ 3 columnas desktop / 2 tablet / 1 móvil        │
├────────────────────────────────────────────────┤
│ CTA INTERMEDIO (después de 6 plantillas)       │
│ "¿No encuentras lo que buscas? Mándanos tu     │
│  referencia de Pinterest y la diseñamos."      │
│ [Enviar mi referencia por WhatsApp]            │
├────────────────────────────────────────────────┤
│ (resto del grid)                               │
├────────────────────────────────────────────────┤
│ CTA FINAL                                      │
│ [Hablar con nosotros] → /contacto              │
└────────────────────────────────────────────────┘
```

**Requisitos técnicos:**
- Filtros con `useState`, sin librerías externas
- Los filtros de evento y estilo son **combinables** (Boda + Floral)
- Estado vacío: si un filtro no arroja resultados, mostrar mensaje + CTA de "diseño a medida"
- Contador visible: "Mostrando X de Y plantillas"
- Lazy loading nativo en imágenes: `loading="lazy"`
- Sin scroll infinito. Grid completo, es un catálogo pequeño.

**El CTA de Pinterest es estratégico, no decorativo.** Es la diferencia central contra Invitio: ellos no aceptan referencias externas. Debe estar visible y repetido.

**Criterio de aceptación:**
- Filtros combinables funcionando
- Grid responsive en 3 breakpoints
- CTA de referencia Pinterest presente y funcional
- Todas las cards navegan a su detalle

---

### FASE 3 — Detalle de plantilla `/plantillas/detalle/:id`
**Objetivo:** Convertir interés en contacto por WhatsApp.

**Estructura de la página:**

```
┌────────────────────────────────────────────────┐
│ [← Volver a plantillas]                        │
├────────────────────────────────────────────────┤
│ ┌──────────────┐  Aurora                       │
│ │              │  Estilo: Elegante             │
│ │  PREVIEW     │  Ideal para: Boda             │
│ │  GRANDE      │                               │
│ │              │  Paleta: [swatch][swatch]     │
│ │  (mockup en  │  Tipografía: Playfair + Inter │
│ │   marco de   │                               │
│ │   celular)   │  "Dorado sobre marfil,        │
│ │              │   tipografía serif de alto     │
│ └──────────────┘   contraste."                 │
│  ○ ○ ○ (galería)                               │
│                    [Quiero esta plantilla]      │
│                     ↑ WhatsApp con ref del ID   │
├────────────────────────────────────────────────┤
│ ¿QUÉ INCLUYE SEGÚN TU PAQUETE?                 │
│ Tabla comparativa leída de paquetes.js:        │
│                                                │
│              Esencial  Premium  Experiencia    │
│ Invitación      ✓         ✓         ✓          │
│ Logo evento     ✓         ✓         ✓          │
│ Save the Date   ✓         ✓         ✓          │
│ Código QR       ✓         ✓         ✓          │
│ RSVP            —         ✓         ✓          │
│ Cuenta regres.  —         ✓         ✓          │
│ Álbum digital   —         ✓         ✓          │
│ Sitio completo  —         —         ✓          │
│ Mesa de regalos —         —         ✓          │
│ Galería previa  —         —         ✓          │
│ ──────────────────────────────────────         │
│ Precio        $719     $1,199    $1,759        │
│               [Ver]     [Ver]     [Ver]        │
│                ↑ links a /servicios/{paquete}  │
├────────────────────────────────────────────────┤
│ ESTA PLANTILLA, PERSONALIZADA PARA TI          │
│ "Cambiamos colores, tipografía, fotos y textos │
│  para que sea única. Nadie más tendrá la tuya."│
│                                                │
│ Lo que personalizamos:                         │
│ · Tus fotos y nombres                          │
│ · Tu paleta de colores                         │
│ · Tipografía y textos                          │
│ · Secciones según tu evento                    │
├────────────────────────────────────────────────┤
│ PLANTILLAS SIMILARES                           │
│ 3 cards del mismo estilo o evento              │
├────────────────────────────────────────────────┤
│ [Quiero esta plantilla] → WhatsApp             │
│ [Tengo otra referencia] → WhatsApp             │
└────────────────────────────────────────────────┘
```

**Requisitos técnicos:**
- Leer la plantilla por `id` desde `plantillas.js` usando `useParams`
- Si el `id` no existe: página 404 amable con CTA de vuelta a `/plantillas`
- La tabla de paquetes se genera **leyendo `paquetes.js`**, nunca hardcodeada
- Preview grande dentro de un marco de celular (mockup CSS, sin imágenes de dispositivo)
- Galería con 2–3 vistas, navegación por dots o thumbnails
- CTA de WhatsApp **arriba y abajo**, ambos con el ID de plantilla en el mensaje
- "Plantillas similares": filtrar por mismo `estilo`, excluir la actual, máximo 3

**Criterio de aceptación:**
- `/plantillas/detalle/ax-001` renderiza datos correctos
- Link de WhatsApp incluye nombre e ID de plantilla
- Tabla comparativa refleja exactamente `paquetes.js`
- 404 amable en id inexistente

---

### FASE 4 — Integración con el resto del sitio
**Objetivo:** Que la galería no sea una isla.

**Tareas:**

1. **Home:** agregar sección "Explora nuestros estilos" después del hero
   - Carrusel o grid de 4 plantillas destacadas (`destacada: true`)
   - CTA "Ver todas las plantillas" → `/plantillas`

2. **`/servicios`:** en cada card de paquete agregar link secundario
   - "Ver plantillas disponibles" → `/plantillas`

3. **Páginas de paquete** (`/servicios/esencial|premium|experiencia`):
   - Sección "Plantillas disponibles en este paquete"
   - Filtrar plantillas por `disponibleEn.includes(paqueteId)`
   - Grid de 6 máximo + "Ver todas"

4. **Página `/proceso`:** actualizar el flujo para reflejar la galería
   - Paso 1: Elige tu plantilla o mándanos tu referencia
   - Paso 2: Recibe tu demo personalizado en 24 horas
   - Paso 3: Revisiones incluidas según tu paquete
   - Paso 4: Entrega final y comparte con tus invitados

5. **Navbar:** "Plantillas" entre "Servicios" y "Portafolio"

6. **Footer:** bloque de links por estilo (SEO)
   - "Invitaciones elegantes", "Invitaciones florales", etc. → `/plantillas/:estilo`

**Criterio de aceptación:**
- Ninguna página huérfana; todas conectan con la galería
- `/proceso` refleja el flujo real con plantillas

---

### FASE 5 — SEO y descubribilidad
**Objetivo:** Que Google traiga clientes sin pauta pagada.

**Tareas:**

1. **Meta tags dinámicos por página** (react-helmet-async o gestión manual del `document.title`)
   - `/plantillas`: "Plantillas de Invitaciones Digitales | Crealo Estudio"
   - `/plantillas/:estilo`: "Invitaciones {Estilo} | Crealo Estudio"
   - `/plantillas/detalle/:id`: "{Nombre} — Invitación {Estilo} | Crealo Estudio"

2. **Rutas por estilo indexables:** `/plantillas/elegante`, `/plantillas/floral`, etc.
   - Página con H1 propio, texto descriptivo del estilo (100–150 palabras) y grid filtrado

3. **`alt` descriptivo en todas las imágenes de plantilla**
   - Formato: `"Plantilla {nombre} — invitación digital {estilo} para {evento}"`

4. **Datos estructurados JSON-LD** en detalle de plantilla
   - Schema tipo `Product` con nombre, imagen, descripción y `offers` (precio del paquete Esencial como precio de entrada)

5. **`sitemap.xml`** generado incluyendo todas las rutas de plantilla

6. **Encabezados semánticos:** un solo `<h1>` por página, jerarquía correcta

**Criterio de aceptación:**
- Cada ruta tiene title y description únicos
- 8 rutas de estilo indexables con contenido propio
- Sitemap incluye todas las plantillas

---

### FASE 6 — Pulido visual y confianza
**Objetivo:** Que se vea más confiable que Invitio, no más tecnológico.

**Tareas:**

1. **Fix global pendiente de restructuracion-2:**
   - Títulos blancos a `#FFFFFF` sólido, sin opacidad reducida
   - Eliminar overflow horizontal en títulos grandes

2. **Sistema de diseño de la galería:**
   - Fondo de contenido: `#F8F8F8` o blanco
   - Acento magenta `#FF2D78` solo en CTAs y estados activos
   - Cards: sombra suave, borde `1px` sutil, radio consistente
   - Hover en card: elevación ligera, sin transformaciones agresivas
   - Transiciones: 200ms ease, nada más lento

3. **Iconos:** `lucide-react` exclusivamente. **Prohibidos los emojis.**

4. **Estados de carga:** skeleton simple mientras cargan imágenes

5. **Accesibilidad mínima:**
   - Contraste AA en todo texto
   - `aria-label` en filtros y botones de icono
   - Navegación por teclado en filtros y cards
   - `focus-visible` visible en todos los interactivos

6. **Performance:**
   - Imágenes de Unsplash con parámetros de tamaño (`?w=800&q=75`)
   - `loading="lazy"` en todo lo que esté bajo el fold
   - Sin librerías de animación nuevas

**Criterio de aceptación:**
- Ningún título transparente o cortado en todo el sitio
- Cero emojis en la interfaz
- Contraste AA verificado
- Navegable por teclado

---

### FASE 7 — Preparación para plantillas reales
**Objetivo:** Que cambiar imágenes placeholder por diseños reales no requiera tocar código.

**Tareas:**
1. Documentar en `/src/data/README-plantillas.md`:
   - Cómo agregar una plantilla nueva (paso a paso)
   - Especificación de imágenes: proporción, tamaño, formato, peso máximo
   - Convención de `id`: `ax-###` incremental
2. Comentar en `plantillas.js` cada campo con su propósito
3. Verificar que agregar una plantilla nueva no requiera modificar ningún `.jsx`

**Criterio de aceptación:**
- El fundador puede agregar una plantilla editando solo `plantillas.js`
- README explica el proceso sin ambigüedad

---

## 4. LO QUE ESTE PROYECTO NO INCLUYE

Declarado explícitamente para evitar scope creep:

- ❌ Editor de invitaciones (eso es Invitio)
- ❌ Cuentas de usuario, login, registro
- ❌ Pasarela de pagos
- ❌ Base de datos de clientes o invitados
- ❌ Panel de administración
- ❌ Backend o API propia
- ❌ Sistema de RSVP propio (se usa Google Form)
- ❌ Subida de archivos por parte del cliente
- ❌ Librerías de animación (Framer Motion, GSAP)
- ❌ Apps móviles

Si alguna tarea parece requerir algo de esta lista, **detenerse y consultar al fundador.**

---

## 5. AGENT.md — Reglas permanentes de esta fase

```markdown
# AGENT.md — Crealo Estudio · Sistema de Plantillas

## Identidad
Crealo Estudio: estudio creativo mexicano de experiencias
digitales para eventos especiales (boda, XV años, baby
shower, cumpleaños especial). Bootstrap, un solo fundador.
Stack: React + Vite + JavaScript + Tailwind + Vercel.

## Modelo de negocio (crítico para decisiones técnicas)
NO somos una plataforma self-service. El cliente NO edita
nada. Elige una plantilla de referencia o manda su propia
inspiración (Pinterest), y el fundador la personaliza y
entrega. La galería es un LENGUAJE VISUAL de venta, no
una herramienta de producción.

## Regla arquitectónica principal
Todo estático. Cero backend. Cero cuentas. Cero pagos.
Toda conversión termina en WhatsApp o /contacto.
Si una tarea requiere backend, detenerse y preguntar.

## Fuentes de verdad
- /src/data/plantillas.js → plantillas, estilos, eventos
- /src/data/paquetes.js   → precios, features, paquetes
Nunca duplicar ni hardcodear estos datos en componentes.

## Rama y proceso
Rama: feature/galeria-plantillas
Generar preview en Vercel al terminar cada fase.
Reportar al fundador. NO mergear a main sin aprobación
explícita. (En la sesión anterior se mergeó directo;
no repetir.)

## Orden de fases (no saltar)
1. Cimientos de datos y ruteo
2. Galería principal /plantillas
3. Detalle /plantillas/detalle/:id
4. Integración con Home, servicios, proceso, footer
5. SEO y rutas por estilo
6. Pulido visual, accesibilidad, performance
7. Documentación para plantillas reales

## Reglas visuales
- Fondo de contenido claro (#F8F8F8 o blanco)
- Magenta #FF2D78 solo como acento en CTAs
- Negro solo en franjas de impacto puntual
- Títulos blancos = #FFFFFF sólido, sin opacidad
- Sin overflow horizontal en títulos
- Iconos: lucide-react. EMOJIS PROHIBIDOS.
- Transiciones máximo 200ms
- Estética: confiable y elegante, nunca futurista

## Reglas de conversión
- CTA de WhatsApp arriba Y abajo en páginas de detalle
- Todo link de WhatsApp incluye el ID de la plantilla
- CTA "manda tu referencia de Pinterest" visible y
  repetido: es la diferencia central contra Invitio
- Máximo 2 clics desde cualquier página hasta contacto

## Prohibido
- Editor de invitaciones
- Cuentas, login, pagos, backend, base de datos
- Panel de administración
- Librerías de animación nuevas
- Emojis como iconos
- Precios hardcodeados fuera de paquetes.js
- Mergear a main sin aprobación
- Mencionar "Sureste", "landing pages" o "negocios"

## Checklist antes de reportar cada fase
- [ ] Criterios de aceptación de la fase cumplidos
- [ ] plantillas.js y paquetes.js siguen siendo únicas
      fuentes de verdad
- [ ] Responsive verificado en móvil, tablet, desktop
- [ ] Sin errores en consola
- [ ] Sin emojis, sin títulos transparentes
- [ ] Links de WhatsApp con contexto correcto
- [ ] Preview en Vercel generado
- [ ] Rama correcta, main intacta
```

---

## 6. ORDEN DE TRABAJO PARA CLAUDE CODE

1. Crear rama `feature/galeria-plantillas` desde `main`
2. Ejecutar **Fase 1** completa → reportar
3. Ejecutar **Fase 2** completa → preview → reportar
4. Ejecutar **Fase 3** completa → preview → reportar
5. Ejecutar **Fase 4** completa → preview → reportar
6. Ejecutar **Fase 5** completa → reportar
7. Ejecutar **Fase 6** completa → preview → reportar
8. Ejecutar **Fase 7** completa → reportar
9. Esperar aprobación del fundador antes de merge a `main`

**Si una fase revela un problema no previsto en este brief:** detenerse, documentar el problema, y consultar al fundador antes de improvisar una solución.

---

## 7. PENDIENTE DEL FUNDADOR (no es trabajo de Claude Code)

El código quedará listo con imágenes placeholder de Unsplash. Para que la galería venda de verdad, el fundador debe producir:

- **12 diseños de invitación propios**, uno por plantilla declarada en `plantillas.js`
- 2–3 capturas por diseño (portada + vistas internas)
- Formato vertical, proporción de celular

Sin esos 12 diseños reales, la galería muestra fotos de stock y el cliente lo nota. **Este es el cuello de botella real del proyecto, no el código.**

---

> Generado desde SMV Dirección Estratégica.
> Cambios al brief se aprueban en ese chat antes de implementarse.