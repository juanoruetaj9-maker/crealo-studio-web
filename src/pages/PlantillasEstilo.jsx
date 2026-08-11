import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { ESTILOS, PLANTILLAS } from '../data/plantillas'
import PlantillaCard from '../components/PlantillaCard'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export default function PlantillasEstilo() {
  const { estilo: estiloId } = useParams()
  const estilo = ESTILOS.find((e) => e.id === estiloId)
  const plantillas = PLANTILLAS.filter((p) => p.estilo === estiloId)

  useDocumentMeta({
    title: estilo ? `Invitaciones ${estilo.nombre} | Crealo Estudio` : 'Plantillas | Crealo Estudio',
    description: estilo ? estilo.textoSeo.slice(0, 155).trim() + '…' : undefined,
  })

  if (!estilo) {
    return (
      <div style={{ backgroundColor: '#F8F8F8', minHeight: '60vh' }} className="flex items-center">
        <div className="max-w-2xl mx-auto px-5 sm:px-8 py-24 text-center">
          <h1 className="font-display font-black text-[#111] text-3xl mb-3">No encontramos este estilo</h1>
          <p className="text-[#666] text-sm mb-8">Explora el catálogo completo de plantillas.</p>
          <Link to="/plantillas"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#FF2D78] text-white font-bold rounded-xl text-sm hover:bg-[#E0155F] transition-colors cursor-pointer"
          >
            <ArrowLeft size={15} /> Ver todas las plantillas
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: '#F8F8F8' }}>
      <section style={{ backgroundColor: '#080808' }} className="pt-14 pb-16 md:pt-20 md:pb-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="mb-6">
            <Link to="/plantillas" className="inline-flex items-center gap-2 text-sm font-semibold text-[#666] hover:text-[#FF2D78] transition-colors cursor-pointer">
              <ArrowLeft size={15} /> Todas las plantillas
            </Link>
          </div>
          <span className="text-[11px] font-semibold text-[#444] uppercase tracking-[0.22em]">Estilo</span>
          <h1 className="font-display font-black text-white text-[clamp(2.4rem,7vw,5rem)] tracking-tight leading-none mt-3 max-w-2xl">
            Invitaciones {estilo.nombre}
          </h1>
          <p className="text-[#555] text-base leading-relaxed mt-5 max-w-lg">
            {estilo.descripcion}. Elige la que más te enamore — nosotros la personalizamos con tus datos, tus fotos y tus colores.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <p className="text-sm text-[#999] mb-6">
            {plantillas.length} {plantillas.length === 1 ? 'plantilla disponible' : 'plantillas disponibles'} en este estilo
          </p>

          <p className="text-sm text-[#666] leading-relaxed max-w-3xl mb-10">
            {estilo.textoSeo}
          </p>

          {plantillas.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-black/15 rounded-2xl">
              <p className="font-display font-bold text-[#111] text-lg mb-2">Aún no hay plantillas en este estilo</p>
              <Link to="/plantillas"
                className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-[#FF2D78] text-white font-bold rounded-xl text-sm hover:bg-[#E0155F] transition-colors cursor-pointer"
              >
                Ver todas las plantillas <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {plantillas.map((p) => (
                <PlantillaCard key={p.id} plantilla={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-[#FF2D78] py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <h2 className="font-display font-black text-black tracking-tight leading-none text-[clamp(2.6rem,7vw,5.5rem)]">
            ¿Ninguna te convenció?
          </h2>
          <Link to="/contacto"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-black text-white font-bold rounded-xl text-sm hover:bg-[#111] transition-colors cursor-pointer shrink-0"
          >
            Hablar con nosotros <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  )
}
