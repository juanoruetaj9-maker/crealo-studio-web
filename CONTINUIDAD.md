# Crealo Estudio — Estado y continuidad del proyecto

> **Para Claude / Chat de Proyectos:** este archivo es el contexto completo para retomar el trabajo. Léelo entero antes de continuar. El usuario es **Juan**. Responde en español.

---

## 1. Qué es
**Crealo Estudio** — sitio web de marketing del estudio creativo digital del sureste mexicano (bodas, XV años, branding, landing pages). Solo frontend, sin backend ni base de datos: es un sitio estático + demos interactivas de portafolio.

- **Stack:** React 19 + Vite 8 + Tailwind CSS v4 + React Router v7 + framer-motion.
- **Dev local:** `npm run dev` → http://localhost:5173

## 2. Diseño actual (Dark Luxury Studio — junio 2026)
El usuario dio carta blanca completa para rediseñar sin restricciones de paleta ni logo.

- Fondo void: `#080808` · Superficie elevada: `#0D0D0D` / `#111111`
- **Acento principal: `#FF2D78`** (rosa eléctrico, confirmado) · hover `#E0155F`
- Contraste claro: `#F5F5F2` · Texto primario `#FFFFFF` · Texto muted `#666`/`#444`/`#555`
- Tipografía: **Syne 800** (headings/navbar/números) + **Manrope 400/500** (body) + Manrope 600 uppercase tracking (labels)
- Navbar flotante `top-4 left-4 right-4` pill, footer horizontal minimal, hero full-viewport, ticker rosa de alto impacto, portafolio en grayscale que satura en hover

## 3. Estado actual (al 2026-07-27)

- ✅ Sitio completo: Home, Servicios, Plantillas (galería + detalle + por estilo), Portafolio, Proceso, Nosotros, Contacto.
- ✅ Demos de portafolio interactivas: Invitaciones + 3 proyectos individuales (Boda Mariana&Diego, XV Isabella, Graduación Emmanuel). `DemoBranding`, `DemoLandingPages` y `ProyectoArqRoberto` se eliminaron en el refactor de 2026-07-2x (el sitio se re-enfocó a eventos especiales: bodas, XV años, baby showers, cumpleaños).
- ✅ **Sistema de "Plantillas" nuevo** (`/plantillas`, `/plantillas/:estilo`, `/plantillas/detalle/:id`): galería de plantillas de invitación por estilo, con detalle individual, SEO (meta tags dinámicos vía `useDocumentMeta`, JSON-LD) y sitemap autogenerado en build (`scripts/generate-sitemap.mjs` → `public/sitemap.xml`, corre como `prebuild`). Datos 100% estáticos en `src/data/plantillas.js`.
- ✅ **Sistema de "Paquetes"/demo interactiva de eventos** (`PaquetesDemo.jsx` + `src/data/paquetes.js`) y componentes de demo reutilizables en `src/components/demo/` (QR, RSVP, álbum, cuenta regresiva, mesa de regalos, save-the-date, logo, invitación integrada).
- ✅ Redesign Dark Luxury Studio aplicado (junio 2026), luego **refactor de paleta clara** (2026-07-2x) extendido a Contacto, Servicios, Portafolio, Proceso, Nosotros y el hero de Home — convivencia de secciones oscuras (`#080808`, ej. headers) y claras (`#F8F8F8`/blanco) según la página. Si se retoma diseño, revisar visualmente cada página para confirmar el estado real de la paleta antes de asumir "todo oscuro" como dice la sección 2 de este doc (esa sección quedó desactualizada tras el refactor).
- ✅ **Fix — countdown de invitaciones** (2026-07-15): hook compartido `src/hooks/useCountdown.js`, limpia el interval al expirar. Verificado con build + lint + prueba en navegador.
- ✅ **Dependencia agregada:** `framer-motion` (^12.41.0).
- ✅ **Validación del campo nombre en Contacto** (2026-07-27): el link "Enviar por WhatsApp" ya no se puede activar con el campo "Tu nombre *" vacío — bloquea el clic, marca el input en rojo y muestra mensaje de error. Verificado inyectando eventos DOM reales (el tool de screenshot de la extensión de Chrome falló en esta sesión con un error interno, no relacionado al código).
- ✅ **Hardening de headers de seguridad (2026-07-27):** `vercel.json` define `Content-Security-Policy`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy` y `Permissions-Policy`. La CSP permite explícitamente `fonts.googleapis.com`/`fonts.gstatic.com` (Google Fonts) e `images.unsplash.com`; todo lo demás restringido a `'self'`. **Nota:** solo tiene efecto en un deploy real en Vercel (no hay `.vercel/` vinculado localmente ni deploy confirmado) — no aplica en `npm run dev`/`vite preview`. Falta verificar en producción con `curl -I` una vez desplegado.
- 🔍 **Auditoría de seguridad/código — dos rondas (2026-07-27):**
  1. Código base (pre-merge): sin secrets/API keys, sin `dangerouslySetInnerHTML`/`eval`, todos los `target="_blank"` con `rel="noopener noreferrer"`, sin vulnerabilidades HIGH/MEDIUM.
  2. Código nuevo fusionado (sistema de plantillas/paquetes/demos, ~1840 líneas): sin vulnerabilidades HIGH/MEDIUM. El único `dangerouslySetInnerHTML` nuevo (JSON-LD en `PlantillaDetalle.jsx`) usa exclusivamente datos estáticos hardcodeados en `src/data/plantillas.js`, no input de usuario — no explotable. El parámetro de ruta `:id` solo se usa como clave de `.find()` contra un arreglo estático, nunca para indexar/evaluar.
  - Hallazgo menor persistente, no crítico: las imágenes de portafolio/demos/plantillas usan stock de Unsplash (no son fotos reales de clientes) — avisar a Juan antes de usarlo en un pitch real.
- ⚠️ **Sincronización de repo (2026-07-27):** la copia local estaba 15 commits atrás de `origin/main` (todo el trabajo de plantillas/paquetes se había hecho fuera de esta sesión/máquina). Se hizo `git pull` + merge (conflicto menor resuelto en `Contacto.jsx`, solo la clase de color del input) y push exitoso. **Antes de asumir que el repo local está al día en la próxima sesión, correr `git fetch && git log HEAD..origin/main --oneline` para confirmar que no hay divergencia de nuevo.**
- ✅ **Rebranding → Crealo Estudio (2026-08-10):** por decisión del equipo ejecutivo, Axolote Studio pasa a llamarse **Crealo Estudio**. Se renombró todo el código, textos, meta/SEO, favicon/logos, `package.json`, sitemap, carpetas con "Axolote" en el nombre y el repo de GitHub (`crealo-studio-web`). Correo nuevo en código: `hola@crealoestudio.mx`. **Pendiente externo:** registrar el dominio `crealoestudio.mx` + correo, renombrar el proyecto en Vercel, y crear/renombrar redes sociales a `crealo_estudio_digital`.

## 4. Infraestructura / accesos
- **Repo GitHub (privado):** https://github.com/juanoruetaj9-maker/crealo-studio-web (rama `main`)
- Sin Supabase, sin variables de entorno. Deploy en Vercel: el proyecto local aún se llama `axolote-studio-web` (`.vercel/project.json`) — pendiente renombrarlo en el dashboard de Vercel; el sitemap y las URLs compartidas ya apuntan a `https://crealoestudio.mx` (dominio aún por registrar).

## 5. Puesta en marcha en una máquina nueva
```bash
git clone https://github.com/juanoruetaj9-maker/crealo-studio-web.git
cd crealo-studio-web
npm install
npm run dev
```
No requiere `.env` — no hay backend ni claves.

## 6. Estructura rápida
- `src/pages/` — Home, Servicios, Plantillas, PlantillasEstilo, PlantillaDetalle, Portafolio, Proceso, Nosotros, Contacto, DemoInvitaciones, y `ProyectoBodasMariana`/`ProyectoXVIsabella`/`ProyectoGraduacionEmmanuel` de portafolio individual.
- `src/components/` — `Navbar`, `Footer`, `DemoBanner`, `MusicPlayerMock`, `FloatingWhatsApp`, `PaquetesDemo`, `PlantillaCard`, y `src/components/demo/` (QR, RSVP, Album, CardShell, CuentaRegresiva, Integrado, Invitacion, Logo, MesaRegalos, SaveTheDate).
- `src/hooks/` — `useCountdown.js` (cuenta regresiva de eventos), `useDocumentMeta.js` (title/meta tags dinámicos por página).
- `src/data/` — `proyectos.js` (portafolio), `plantillas.js` (galería de plantillas + estilos), `paquetes.js` (paquetes/demo de eventos), `README-plantillas.md` (docs del sistema de plantillas).
- `scripts/generate-sitemap.mjs` — genera `public/sitemap.xml` en cada build (`prebuild`), a partir de las rutas estáticas + `plantillas.js`.

## 7. Próximo paso al retomar
1. ✅ Sitio + demos + redesign dark luxury → refactor a paleta clara + sistema de plantillas/paquetes.
2. ✅ Fix del countdown congelado.
3. ✅ Validación del campo de nombre en Contacto.
4. ✅ Headers de seguridad en `vercel.json`.
5. **Pendiente (decisión de Juan):** reemplazar las fotos de stock de Unsplash por fotografía real si el portafolio/plantillas se van a usar en pitches reales a clientes.
6. **Pendiente:** verificar los headers de seguridad (`vercel.json`) una vez desplegado en producción — confirmar con `curl -I` que `Content-Security-Policy`/`X-Frame-Options`/etc. llegan y que no rompen fuentes (Google Fonts) ni imágenes (Unsplash).
7. **Pendiente:** confirmar visualmente el estado real de la paleta por página (sección 2/3 de este doc) — el refactor a claro no fue verificado en navegador en esta sesión, solo por diff/build.
8. **Siguiente** — definir con Juan qué sigue: deploy a producción (si no existe ya), más plantillas/proyectos de portafolio, o ajustes de contenido/copy.
