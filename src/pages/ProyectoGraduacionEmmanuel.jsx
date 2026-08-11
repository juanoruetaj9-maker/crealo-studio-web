import { useEffect } from 'react'
import { MapPin, ChevronDown, GraduationCap, Heart } from 'lucide-react'
import DemoBanner from '../components/DemoBanner'
import MusicPlayerMock from '../components/MusicPlayerMock'
import { useCountdown } from '../hooks/useCountdown'

const TARGET = new Date('2026-07-25T18:00:00')
const WA = `https://wa.me/529932228936?text=${encodeURIComponent('Hola, confirmo mi asistencia a la graduación de Emmanuel el 25 de julio 🎓')}`
const BLUE = '#1B4FD8'
const SERIF = { fontFamily: "'Cormorant Garamond', Georgia, serif" }

const GALLERY = [
  'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=700&q=80',
  'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=700&q=80',
  'https://images.unsplash.com/photo-1562774053-701939374585?w=700&q=80',
  'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=700&q=80',
  'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=700&q=80',
  'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=700&q=80',
]

export default function ProyectoGraduacionEmmanuel() {
  const t = useCountdown(TARGET)

  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap'
    document.head.appendChild(link)
    return () => document.head.removeChild(link)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <DemoBanner cta="Hola! Vi la invitación de graduación de Crealo Estudio. Quiero una para mi evento." />

      {/* Hero */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center text-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=1920&q=80)', backgroundSize: 'cover', backgroundPosition: 'center top' }}
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(15,30,90,0.80) 0%, rgba(15,30,90,0.50) 40%, rgba(10,20,70,0.80) 100%)' }} />
        <div className="relative z-10 px-6 flex flex-col items-center">
          <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center mb-6 border border-white/30">
            <GraduationCap size={24} className="text-yellow-300" />
          </div>
          <p className="text-blue-200 uppercase tracking-[0.5em] text-xs mb-4 font-light">La graduación de</p>
          <h1 className="font-light text-white leading-none mb-4" style={{ ...SERIF, fontSize: 'clamp(3rem, 12vw, 8rem)' }}>
            Emmanuel
          </h1>
          <h2 className="font-light text-blue-200 mb-5" style={{ ...SERIF, fontSize: 'clamp(1.2rem, 4vw, 2rem)' }}>
            Licenciado en Arquitectura
          </h2>
          <div className="flex items-center gap-4 mb-5">
            <div className="h-px w-12 bg-blue-300/40" />
            <p className="text-blue-100 text-sm tracking-[0.3em] uppercase font-light">25 · Julio · 2026</p>
            <div className="h-px w-12 bg-blue-300/40" />
          </div>
          <p className="text-white/60 text-sm flex items-center gap-1.5 justify-center mb-10">
            <MapPin size={13} className="text-blue-300" />
            Universidad Autónoma de Campeche
          </p>
          <MusicPlayerMock song="Good Riddance — Green Day" artist="Playlist de Emmanuel · Spotify" />
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 animate-bounce">
          <ChevronDown size={20} />
        </div>
      </section>

      {/* Countdown */}
      <section className="py-14 text-center" style={{ background: '#EEF2FF' }}>
        <p className="text-blue-400 uppercase tracking-widest text-[10px] mb-8">Cuenta regresiva</p>
        <div className="flex gap-6 md:gap-10 justify-center">
          {[{ l: 'Días', v: t.days }, { l: 'Horas', v: t.hours }, { l: 'Min', v: t.minutes }, { l: 'Seg', v: t.seconds }].map(({ l, v }) => (
            <div key={l}>
              <div className="tabular-nums" style={{ ...SERIF, fontSize: 'clamp(2.5rem, 8vw, 4rem)', color: BLUE }}>{String(v).padStart(2, '0')}</div>
              <p className="text-blue-400 text-[9px] uppercase tracking-widest mt-1">{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story / Dedicatoria */}
      <section className="py-16 px-6 max-w-lg mx-auto text-center">
        <Heart size={15} className="mx-auto text-blue-400 mb-5" fill="currentColor" />
        <h2 className="text-3xl text-gray-800 mb-6 font-light" style={SERIF}>Para los que estuvieron</h2>
        <p className="text-gray-500 leading-loose text-sm">
          Cinco años de desvelos, proyectos, correcciones y aprendizajes. Esto no hubiera sido posible sin el apoyo de cada uno de ustedes — familia, amigos y maestros que creyeron antes que yo mismo.
        </p>
        <p className="text-gray-500 leading-loose text-sm mt-3">
          Esta celebración es un agradecimiento. El logro es de todos.
        </p>
      </section>

      {/* Gallery */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-center text-xs uppercase tracking-[0.4em] text-gray-400 mb-8" style={SERIF}>Galería premium · Hasta 20 fotos</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
            {GALLERY.map((src, i) => (
              <div key={src} className={`overflow-hidden rounded-xl ${i === 0 ? 'row-span-2' : 'aspect-square'}`}>
                <img src={src} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event details */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl text-gray-800 text-center mb-10 font-light" style={SERIF}>El día de la ceremonia</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { emoji: '🎓', t: 'Ceremonia de graduación', time: '11:00 hrs', venue: 'Auditorio UAC', addr: 'Av. Agustín Melgar s/n, Campeche' },
              { emoji: '🥂', t: 'Brunch de celebración', time: '14:00 hrs', venue: 'Restaurante El Baluarte', addr: 'Circuito Baluartes, Centro Histórico' },
            ].map((ev) => (
              <div key={ev.t} className="border border-blue-100 rounded-2xl p-7 text-center bg-blue-50/30 hover:bg-blue-50/60 transition-colors">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4 text-xl">{ev.emoji}</div>
                <h3 className="text-base text-gray-800 mb-2 font-semibold" style={SERIF}>{ev.t}</h3>
                <p className="font-semibold text-sm" style={{ color: BLUE }}>25 de Julio · {ev.time}</p>
                <p className="text-gray-700 text-sm mt-2 font-medium">{ev.venue}</p>
                <p className="text-gray-400 text-xs mt-0.5">{ev.addr}</p>
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-xs underline mt-3 inline-block text-blue-500">Ver en Google Maps →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RSVP */}
      <section className="py-16 text-white text-center px-6" style={{ background: BLUE }}>
        <h2 className="text-3xl font-light mb-2" style={SERIF}>¿Vas a estar ahí?</h2>
        <p className="text-blue-200 text-sm mb-7">Confirma antes del 18 de julio · Tu presencia es el mejor regalo</p>
        <a
          href={WA}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white font-bold px-8 py-3.5 rounded-full hover:bg-blue-50 transition-all shadow-xl text-sm"
          style={{ color: BLUE }}
        >
          ✓ Confirmar asistencia
        </a>
      </section>
    </div>
  )
}
