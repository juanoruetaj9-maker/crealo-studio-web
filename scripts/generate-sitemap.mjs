// Genera public/sitemap.xml a partir de las rutas estáticas del sitio y de
// src/data/plantillas.js (ESTILOS y PLANTILLAS), para que agregar una
// plantilla nueva actualice el sitemap sin tocar este script.
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { ESTILOS, PLANTILLAS } from '../src/data/plantillas.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SITE_URL = 'https://crealoestudio.mx'

const rutasEstaticas = [
  '/',
  '/servicios',
  '/plantillas',
  '/portafolio',
  '/proceso',
  '/nosotros',
  '/contacto',
]

const rutasEstilo = ESTILOS.map((e) => `/plantillas/${e.id}`)
const rutasPlantilla = PLANTILLAS.map((p) => `/plantillas/detalle/${p.id}`)

const todasLasRutas = [...rutasEstaticas, ...rutasEstilo, ...rutasPlantilla]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${todasLasRutas.map((ruta) => `  <url>\n    <loc>${SITE_URL}${ruta}</loc>\n  </url>`).join('\n')}
</urlset>
`

writeFileSync(resolve(__dirname, '../public/sitemap.xml'), xml)
console.log(`sitemap.xml generado con ${todasLasRutas.length} rutas`)
