import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, Heart, Crown, Baby, PartyPopper, MessageCircle } from 'lucide-react'
import { ESTILOS, EVENTOS, PLANTILLAS, buildPlantillaWhatsappLink } from '../data/plantillas'
import { paquetes } from '../data/paquetes'
import PlantillaCard from '../components/PlantillaCard'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

const ICONOS = { Heart, Crown, Baby, PartyPopper }

const PINTEREST_WA_LINK = `https://wa.me/529932228936?text=${encodeURIComponent(
  'Hola, tengo una referencia (Pinterest u otra imagen) para mi invitación. ¿Me ayudan a personalizarla?'
)}`

// Filas de la tabla comparativa: se derivan de paquetes.js, nunca se hardcodean los checks.
const FILAS_COMPARATIVA = [
  { label: 'Invitación web', check: (p) => p.piezas.includes('invitacion') },
  { label: 'Logo del evento', check: (p) => p.piezas.includes('logo') },
  { label: 'Save the Date', check: (p) => p.piezas.includes('save-the-date') },
  { label: 'Código QR', check: (p) => p.piezas.includes('qr') },
  { label: 'RSVP', check: (p) => p.piezas.includes('rsvp') },
  { label: 'Cuenta regresiva', check: (p) => p.piezas.includes('cuenta-regresiva') },
  { label: 'Álbum digital', check: (p) => p.piezas.includes('album') },
  { label: 'Sitio web completo', check: (p) => p.incluye.some((i) => i.includes('Sitio web completo')) },
  { label: 'Mesa de regalos', check: (p) => p.piezas.includes('mesa-regalos') },
  { label: 'Galería previa', check: (p) => p.incluye.some((i) => i.includes('Galería previa')) },
]

function NotFound() {
  return (
    <div style={{ backgroundColor: '#F8F8F8', minHeight: '60vh' }} className="flex items-center">
      <div className="max-w-2xl mx-auto px-5 sm:px-8 py-24 text-center">
        <h1 className="font-display font-black text-[#111] text-3xl mb-3">No encontramos esta plantilla</h1>
        <p className="text-[#666] text-sm mb-8">
          Puede que el enlace esté mal escrito o la plantilla ya no esté disponible. Explora el resto de la galería.
        </p>
        <Link to="/plantillas"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#FF2D78] text-white font-bold rounded-xl text-sm hover:bg-[#E0155F] transition-colors cursor-pointer"
        >
          <ArrowLeft size={15} /> Volver a plantillas
        </Link>
      </div>
    </div>
  )
}

export default function PlantillaDetalle() {
  const { id } = useParams()
  const [vistaActiva, setVistaActiva] = useState(0)
  const plantilla = PLANTILLAS.find((p) => p.id === id)

  const estiloParaTitulo = ESTILOS.find((e) => e.id === plantilla?.estilo)
  useDocumentMeta({
    title: plantilla ? `${plantilla.nombre} — Invitación ${estiloParaTitulo?.nombre} | Crealo Estudio` : 'Plantilla no encontrada | Crealo Estudio',
    description: plantilla?.descripcion,
  })

  if (!plantilla) return <NotFound />

  const estilo = ESTILOS.find((e) => e.id === plantilla.estilo)
  const eventoPrincipal = EVENTOS.find((e) => e.id === plantilla.eventos[0])
  const IconoEvento = ICONOS[eventoPrincipal?.icono]

  const similares = PLANTILLAS
    .filter((p) => p.estilo === plantilla.estilo && p.id !== plantilla.id)
    .slice(0, 3)

  const waLinkTop = buildPlantillaWhatsappLink({
    plantillaId: plantilla.id,
    plantillaNombre: plantilla.nombre,
    eventoNombre: eventoPrincipal?.nombre || 'evento',
    paqueteNombre: paquetes.find((p) => p.destacado)?.nombre || paquetes[0].nombre,
  })

  const precioEntrada = paquetes.find((p) => p.id === 'esencial')?.precio ?? paquetes[0].precio
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: plantilla.nombre,
    image: plantilla.portada,
    description: plantilla.descripcion,
    offers: {
      '@type': 'Offer',
      price: precioEntrada,
      priceCurrency: 'MXN',
      availability: 'https://schema.org/InStock',
      url: `https://crealoestudio.mx/plantillas/detalle/${plantilla.id}`,
    },
  }

  return (
    <div style={{ backgroundColor: '#F8F8F8' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-10 md:py-16">

        <Link to="/plantillas" className="inline-flex items-center gap-2 text-sm font-semibold text-[#555] hover:text-[#FF2D78] transition-colors cursor-pointer mb-8">
          <ArrowLeft size={15} /> Volver a plantillas
        </Link>

        {/* Preview + info */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">

          {/* Marco de celular */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-[280px] rounded-[2.5rem] border-[10px] border-[#111] bg-[#111] shadow-xl overflow-hidden relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#111] rounded-b-xl z-10" />
              <div className="aspect-[9/19] overflow-hidden bg-[#EFEFEF]">
                <img
                  src={plantilla.galeria[vistaActiva] || plantilla.portada}
                  alt={`Vista de la plantilla ${plantilla.nombre} — invitación digital ${estilo?.nombre.toLowerCase()} para ${eventoPrincipal?.nombre.toLowerCase()}`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {plantilla.galeria.length > 1 && (
              <div className="flex items-center gap-2 mt-5">
                {plantilla.galeria.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Ver vista ${i + 1}`}
                    onClick={() => setVistaActiva(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 cursor-pointer ${
                      vistaActiva === i ? 'bg-[#FF2D78] w-6' : 'bg-black/15 hover:bg-black/30'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <h1 className="font-display font-black text-[#111] text-3xl md:text-4xl tracking-tight mb-2">
              {plantilla.nombre}
            </h1>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#666] mb-6">
              <span>Estilo: <strong className="text-[#111]">{estilo?.nombre}</strong></span>
              <span className="flex items-center gap-1.5">
                Ideal para: <strong className="text-[#111] flex items-center gap-1">{IconoEvento && <IconoEvento size={14} className="text-[#FF2D78]" />} {eventoPrincipal?.nombre}</strong>
              </span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-semibold text-[#999] uppercase tracking-wider">Paleta</span>
              <span className="w-6 h-6 rounded-full border border-black/10" style={{ backgroundColor: plantilla.paletaPrincipal }} />
              <span className="w-6 h-6 rounded-full border border-black/10" style={{ backgroundColor: plantilla.paletaSecundaria }} />
              <span className="text-xs text-[#999] ml-2">{plantilla.tipografiaTitulo} + {plantilla.tipografiaCuerpo}</span>
            </div>

            <p className="text-[#555] text-sm leading-relaxed mb-8">
              {plantilla.descripcion}
            </p>

            <a
              href={waLinkTop}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#FF2D78] text-white font-bold rounded-xl text-sm hover:bg-[#E0155F] transition-colors shadow-md cursor-pointer"
            >
              Quiero esta plantilla <ArrowRight size={14} />
            </a>
          </div>
        </div>

        {/* Tabla comparativa */}
        <div className="mt-20 md:mt-28">
          <h2 className="font-display font-black text-[#111] text-2xl md:text-3xl tracking-tight mb-2 text-center">
            ¿Qué incluye según tu paquete?
          </h2>
          <p className="text-center text-[#999] text-sm mb-10">Esta plantilla está disponible en los 3 paquetes</p>

          <div className="overflow-x-auto -mx-5 px-5">
            <table className="w-full min-w-[560px] border-collapse">
              <thead>
                <tr>
                  <th className="text-left text-xs font-bold text-[#999] uppercase tracking-wider pb-4 pr-4">&nbsp;</th>
                  {paquetes.map((p) => (
                    <th key={p.id} className="text-center pb-4 px-3">
                      <span className={`font-display font-bold text-sm ${p.destacado ? 'text-[#FF2D78]' : 'text-[#111]'}`}>{p.nombre}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FILAS_COMPARATIVA.map((fila) => (
                  <tr key={fila.label} className="border-t border-black/8">
                    <td className="text-sm text-[#555] py-3 pr-4">{fila.label}</td>
                    {paquetes.map((p) => (
                      <td key={p.id} className="text-center py-3 px-3">
                        {fila.check(p)
                          ? <Check size={16} className="inline text-[#FF2D78]" />
                          : <span className="text-black/15">—</span>}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="border-t-2 border-black/10">
                  <td className="text-sm font-bold text-[#111] py-4 pr-4">Precio</td>
                  {paquetes.map((p) => (
                    <td key={p.id} className="text-center py-4 px-3">
                      <span className="font-display font-black text-[#111]">${p.precio.toLocaleString('es-MX')}</span>
                      <span className="text-xs text-[#999] block">MXN</span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td />
                  {paquetes.map((p) => (
                    <td key={p.id} className="text-center pb-2 px-3">
                      <Link to="/servicios"
                        className="inline-block px-4 py-1.5 rounded-lg text-xs font-semibold border border-black/10 text-[#555] hover:border-[#FF2D78] hover:text-[#FF2D78] transition-colors cursor-pointer"
                      >
                        Ver
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Esta plantilla, personalizada para ti */}
        <div className="mt-20 md:mt-28 rounded-2xl border border-black/8 bg-white p-8 md:p-12">
          <h2 className="font-display font-black text-[#111] text-2xl md:text-3xl tracking-tight mb-3">
            Esta plantilla, personalizada para ti
          </h2>
          <p className="text-[#555] text-sm leading-relaxed mb-6 max-w-xl">
            Cambiamos colores, tipografía, fotos y textos para que sea única. Nadie más tendrá la tuya.
          </p>
          <ul className="grid sm:grid-cols-2 gap-3 max-w-xl">
            {['Tus fotos y nombres', 'Tu paleta de colores', 'Tipografía y textos', 'Secciones según tu evento'].map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-[#555]">
                <Check size={15} className="text-[#FF2D78] shrink-0" /> {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Plantillas similares */}
        {similares.length > 0 && (
          <div className="mt-20 md:mt-28">
            <h2 className="font-display font-black text-[#111] text-2xl tracking-tight mb-8">Plantillas similares</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {similares.map((p) => (
                <PlantillaCard key={p.id} plantilla={p} />
              ))}
            </div>
          </div>
        )}

        {/* CTA final */}
        <div className="mt-20 md:mt-28 rounded-2xl bg-[#FF2D78] p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <p className="font-display font-black text-black text-2xl md:text-3xl tracking-tight max-w-md">
            ¿Lista para hacerla tuya?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a href={waLinkTop} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-black text-white font-bold rounded-xl text-sm hover:bg-[#111] transition-colors cursor-pointer"
            >
              Quiero esta plantilla <ArrowRight size={14} />
            </a>
            <a href={PINTEREST_WA_LINK} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border-2 border-black/20 text-black font-semibold rounded-xl text-sm hover:border-black/40 transition-colors cursor-pointer"
            >
              Tengo otra referencia <MessageCircle size={15} />
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}
