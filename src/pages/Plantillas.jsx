import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, ArrowRight, MessageCircle } from 'lucide-react'
import { ESTILOS, EVENTOS, PLANTILLAS } from '../data/plantillas'
import PlantillaCard from '../components/PlantillaCard'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

const PINTEREST_WA_LINK = `https://wa.me/529932228936?text=${encodeURIComponent(
  'Hola, tengo una referencia (Pinterest u otra imagen) para mi invitación. ¿Me ayudan a personalizarla?'
)}`

export default function Plantillas() {
  useDocumentMeta({
    title: 'Plantillas de Invitaciones Digitales | Crealo Estudio',
    description: 'Explora la galería de plantillas de invitaciones digitales de Crealo Estudio para bodas, XV años, baby shower y cumpleaños. Elige tu estilo y lo personalizamos para ti.',
  })

  const [eventoFiltro, setEventoFiltro] = useState('todos')
  const [estiloFiltro, setEstiloFiltro] = useState('todos')

  const filtradas = PLANTILLAS.filter((p) => {
    const pasaEvento = eventoFiltro === 'todos' || p.eventos.includes(eventoFiltro)
    const pasaEstilo = estiloFiltro === 'todos' || p.estilo === estiloFiltro
    return pasaEvento && pasaEstilo
  })

  const primeras = filtradas.slice(0, 6)
  const resto = filtradas.slice(6)

  return (
    <div style={{ backgroundColor: '#F8F8F8' }}>

      {/* Hero */}
      <section style={{ backgroundColor: '#080808' }} className="pt-14 pb-16 md:pt-20 md:pb-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <span className="text-[11px] font-semibold text-[#444] uppercase tracking-[0.22em]">Galería de plantillas</span>
          <h1 className="font-display font-black text-white text-[clamp(2.4rem,7vw,5rem)] tracking-tight leading-none mt-3 max-w-2xl">
            Encuentra el estilo de tu evento
          </h1>
          <p className="text-[#555] text-base leading-relaxed mt-5 max-w-lg">
            Elige la plantilla que te enamore. Nosotros la personalizamos con tus datos, tus fotos y tus colores.
          </p>
          <a href="#filtros" className="inline-flex items-center gap-2 mt-8 text-sm font-semibold text-[#FF2D78] hover:text-white transition-colors cursor-pointer">
            Ver cómo funciona <ChevronDown size={16} />
          </a>
        </div>
      </section>

      {/* Filtros */}
      <section id="filtros" className="py-12 md:py-16 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

          <div className="mb-5">
            <span className="text-[11px] font-bold text-[#999] uppercase tracking-[0.2em] block mb-3">Por evento</span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setEventoFiltro('todos')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  eventoFiltro === 'todos' ? 'bg-[#FF2D78] text-white' : 'bg-white text-[#555] border border-black/8 hover:border-black/20'
                }`}
              >
                Todos
              </button>
              {EVENTOS.map((e) => (
                <button
                  key={e.id}
                  onClick={() => setEventoFiltro(e.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    eventoFiltro === e.id ? 'bg-[#FF2D78] text-white' : 'bg-white text-[#555] border border-black/8 hover:border-black/20'
                  }`}
                >
                  {e.nombre}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-10">
            <span className="text-[11px] font-bold text-[#999] uppercase tracking-[0.2em] block mb-3">Por estilo</span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setEstiloFiltro('todos')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  estiloFiltro === 'todos' ? 'bg-[#FF2D78] text-white' : 'bg-white text-[#555] border border-black/8 hover:border-black/20'
                }`}
              >
                Todos
              </button>
              {ESTILOS.map((e) => (
                <button
                  key={e.id}
                  onClick={() => setEstiloFiltro(e.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    estiloFiltro === e.id ? 'bg-[#FF2D78] text-white' : 'bg-white text-[#555] border border-black/8 hover:border-black/20'
                  }`}
                >
                  {e.nombre}
                </button>
              ))}
            </div>
          </div>

          <p className="text-sm text-[#999] mb-6">
            Mostrando {filtradas.length} de {PLANTILLAS.length} plantillas
          </p>

          {filtradas.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-black/15 rounded-2xl">
              <p className="font-display font-bold text-[#111] text-lg mb-2">No encontramos una plantilla con esa combinación</p>
              <p className="text-sm text-[#666] mb-6 max-w-md mx-auto">
                Diseñamos plantillas a medida partiendo de tu propia referencia — mándanos una imagen y lo resolvemos por WhatsApp.
              </p>
              <a
                href={PINTEREST_WA_LINK}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#FF2D78] text-white font-bold rounded-xl text-sm hover:bg-[#E0155F] transition-colors cursor-pointer"
              >
                Enviar mi referencia por WhatsApp <MessageCircle size={15} />
              </a>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {primeras.map((p) => (
                  <PlantillaCard key={p.id} plantilla={p} />
                ))}
              </div>

              {resto.length > 0 && (
                <>
                  {/* CTA intermedio — referencia de Pinterest */}
                  <div className="my-10 rounded-2xl border border-[#FF2D78]/20 bg-[#FF2D78]/5 p-6 md:p-8 text-center">
                    <p className="font-display font-bold text-[#111] text-lg mb-1.5">¿No encuentras lo que buscas?</p>
                    <p className="text-sm text-[#555] mb-5 max-w-md mx-auto">
                      Mándanos tu referencia de Pinterest y la diseñamos para ti.
                    </p>
                    <a
                      href={PINTEREST_WA_LINK}
                      target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF2D78] text-white font-bold rounded-xl text-sm hover:bg-[#E0155F] transition-colors cursor-pointer"
                    >
                      Enviar mi referencia por WhatsApp <MessageCircle size={15} />
                    </a>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {resto.map((p) => (
                      <PlantillaCard key={p.id} plantilla={p} />
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-[#FF2D78] py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <h2 className="font-display font-black text-black tracking-tight leading-none text-[clamp(2.6rem,7vw,5.5rem)]">
            ¿Ninguna te convenció del todo?
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
