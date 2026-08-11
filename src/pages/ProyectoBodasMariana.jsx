import { useEffect } from 'react'
import { Heart, MapPin, ChevronDown } from 'lucide-react'
import DemoBanner from '../components/DemoBanner'
import MusicPlayerMock from '../components/MusicPlayerMock'
import { useCountdown } from '../hooks/useCountdown'

const WA = `https://wa.me/529932228936?text=${encodeURIComponent('Hola, confirmo mi asistencia a la boda de Mariana & Diego el 28 de junio 💐')}`
const TARGET = new Date('2026-06-28T18:00:00')
const SERIF = { fontFamily: "'Cormorant Garamond', Georgia, serif" }

const GALLERY = [
  'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=700&q=80',
  'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=700&q=80',
  'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=700&q=80',
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=700&q=80',
  'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=700&q=80',
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=700&q=80',
]

export default function ProyectoBodasMariana() {
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
      <DemoBanner cta="Hola! Vi la invitación de boda de Crealo Estudio y me encantó. Quiero una para mi evento." />

      {/* Hero */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center text-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1920&q=80)', backgroundSize: 'cover', backgroundPosition: 'center top' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/65" />
        <div className="relative z-10 px-6 flex flex-col items-center">
          <p className="text-rose-200 uppercase tracking-[0.5em] text-xs mb-7 font-light">El matrimonio de</p>
          <h1 className="font-light text-white leading-none mb-5" style={{ ...SERIF, fontSize: 'clamp(3.5rem, 12vw, 9rem)' }}>
            Mariana <span className="italic text-rose-300">&</span> Diego
          </h1>
          <div className="flex items-center gap-5 mb-5">
            <div className="h-px w-14 bg-rose-300/40" />
            <p className="text-rose-100 text-sm tracking-[0.3em] uppercase font-light">28 · Junio · 2026</p>
            <div className="h-px w-14 bg-rose-300/40" />
          </div>
          <p className="text-white/60 text-sm flex items-center gap-1.5 justify-center mb-10">
            <MapPin size={13} className="text-rose-300" />
            Hacienda Santa Cruz, Mérida, Yucatán
          </p>
          <MusicPlayerMock song="Perfect — Ed Sheeran" artist="Playlist de la boda · Spotify" />
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 animate-bounce">
          <ChevronDown size={20} />
        </div>
      </section>

      {/* Countdown */}
      <section className="py-14 bg-rose-50 text-center">
        <p className="text-rose-400 uppercase tracking-widest text-[10px] mb-8">Faltan</p>
        <div className="flex gap-6 md:gap-10 justify-center">
          {[{ l: 'Días', v: t.days }, { l: 'Horas', v: t.hours }, { l: 'Min', v: t.minutes }, { l: 'Seg', v: t.seconds }].map(({ l, v }) => (
            <div key={l}>
              <div className="tabular-nums text-rose-800" style={{ ...SERIF, fontSize: 'clamp(2.5rem, 8vw, 4rem)' }}>{String(v).padStart(2, '0')}</div>
              <p className="text-rose-400 text-[9px] uppercase tracking-widest mt-1">{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="py-16 px-6 max-w-lg mx-auto text-center">
        <Heart size={15} className="mx-auto text-rose-400 mb-5" fill="currentColor" />
        <h2 className="text-3xl text-gray-800 mb-6 font-light" style={SERIF}>Nuestra historia</h2>
        <p className="text-gray-500 leading-loose text-sm">
          Nos conocimos en el verano de 2020, en un concierto al que ninguno de los dos quería ir. Diego fue por compromiso con un amigo; Mariana, convencida en el último momento por su hermana. Fue en la segunda canción cuando nuestros ojos se cruzaron.
        </p>
        <p className="text-gray-500 leading-loose text-sm mt-3">
          Cinco años después, ese momento sigue siendo nuestro favorito — hasta que llegue el 28 de junio.
        </p>
        <div className="flex items-center justify-center gap-3 mt-7">
          <div className="h-px w-10 bg-rose-200" /><Heart size={10} className="text-rose-300" fill="currentColor" /><div className="h-px w-10 bg-rose-200" />
        </div>
      </section>

      {/* Gallery */}
      <section className="py-12 bg-stone-50">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-center text-xs uppercase tracking-[0.4em] text-gray-400 mb-8" style={SERIF}>Nuestra galería</p>
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
          <h2 className="text-3xl text-gray-800 text-center mb-10 font-light" style={SERIF}>Detalles del evento</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { emoji: '⛪', t: 'Ceremonia', time: '17:00 hrs', venue: 'Parroquia de Santiago Apóstol', addr: 'Calle 72 x 69, Centro, Mérida' },
              { emoji: '🥂', t: 'Recepción', time: '19:30 hrs', venue: 'Hacienda Santa Cruz', addr: 'Km 18 Carretera Mérida–Progreso' },
            ].map((ev) => (
              <div key={ev.t} className="border border-rose-100 rounded-2xl p-7 text-center bg-rose-50/30 hover:bg-rose-50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center mx-auto mb-4 text-xl">{ev.emoji}</div>
                <h3 className="text-lg text-gray-800 mb-2" style={SERIF}>{ev.t}</h3>
                <p className="text-rose-600 font-semibold text-sm">28 de Junio · {ev.time}</p>
                <p className="text-gray-700 text-sm mt-2 font-medium">{ev.venue}</p>
                <p className="text-gray-400 text-xs mt-0.5">{ev.addr}</p>
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-rose-500 text-xs underline mt-3 inline-block">Ver en Google Maps →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dress code */}
      <section className="py-12 bg-rose-900 text-white text-center px-6">
        <p className="text-rose-300 uppercase tracking-[0.4em] text-[10px] mb-3">Código de vestimenta</p>
        <h3 className="text-2xl font-light mb-2" style={SERIF}>Formal · Tonos pasteles</h3>
        <p className="text-rose-300/70 text-sm">Evitar el blanco. Rosé, azul cielo y menta son bienvenidos.</p>
        <div className="flex justify-center gap-3 mt-5">
          {['#F2B8BB', '#B8D4F2', '#B8F2D4', '#F2D4B8', '#D4B8F2'].map((c) => (
            <div key={c} className="w-8 h-8 rounded-full border-2 border-white/20 shadow-md" style={{ backgroundColor: c }} />
          ))}
        </div>
      </section>

      {/* RSVP */}
      <section className="py-16 bg-stone-50 text-center px-6">
        <h2 className="text-3xl text-gray-800 mb-2 font-light" style={SERIF}>¿Vas a venir?</h2>
        <p className="text-gray-500 text-sm mb-7">Confirma tu asistencia antes del 14 de junio</p>
        <a
          href={WA}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-rose-700 text-white font-semibold px-8 py-3.5 rounded-full hover:bg-rose-800 transition-all shadow-lg text-sm"
        >
          ✓ Confirmar asistencia vía WhatsApp
        </a>
        <p className="text-gray-400 text-xs mt-3">Tu lugar estará reservado</p>
      </section>
    </div>
  )
}
