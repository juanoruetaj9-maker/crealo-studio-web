import { MapPin, ChevronDown, Star } from 'lucide-react'
import DemoBanner from '../components/DemoBanner'
import MusicPlayerMock from '../components/MusicPlayerMock'
import { useCountdown } from '../hooks/useCountdown'

const TARGET = new Date('2026-08-15T19:00:00')
const PURPLE = '#7C3AED'
const SERIF = { fontFamily: 'Georgia, serif' }

const GALLERY = [
  'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=700&q=80',
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=700&q=80',
  'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=700&q=80',
  'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=700&q=80',
  'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=700&q=80',
  'https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=700&q=80',
]

export default function ProyectoXVIsabella() {
  const t = useCountdown(TARGET)

  return (
    <div className="min-h-screen" style={{ background: '#faf7ff' }}>
      <DemoBanner cta="Hola! Vi la invitación de XV años de Crealo Estudio y me encantó. Quiero una para mi evento." />

      {/* Hero */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center text-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(76,29,149,0.75) 0%, rgba(76,29,149,0.45) 40%, rgba(30,10,60,0.75) 100%)' }} />
        <div className="relative z-10 px-6 flex flex-col items-center">
          <Star size={20} fill="#DDD6FE" className="text-purple-200 mb-6" />
          <p className="text-purple-200 uppercase tracking-[0.5em] text-xs mb-4 font-light">La magia de sus</p>
          <h1
            className="font-light text-white leading-none mb-3"
            style={{ ...SERIF, fontSize: 'clamp(5rem, 16vw, 12rem)', fontStyle: 'italic' }}
          >
            XV
          </h1>
          <h2
            className="font-light text-purple-100 mb-5"
            style={{ ...SERIF, fontSize: 'clamp(2rem, 7vw, 5rem)' }}
          >
            Isabella Flores
          </h2>
          <div className="flex items-center gap-4 mb-5">
            <div className="h-px w-12 bg-purple-300/40" />
            <p className="text-purple-200 text-sm tracking-[0.3em] uppercase font-light">15 · Agosto · 2026</p>
            <div className="h-px w-12 bg-purple-300/40" />
          </div>
          <p className="text-white/60 text-sm flex items-center gap-1.5 justify-center mb-10">
            <MapPin size={13} className="text-purple-300" />
            Salón El Palacio, Villahermosa, Tabasco
          </p>
          <MusicPlayerMock song="Flowers — Miley Cyrus" artist="Playlist de Isabella · Spotify" />
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 animate-bounce">
          <ChevronDown size={20} />
        </div>
      </section>

      {/* Countdown */}
      <section className="py-14 text-center" style={{ background: '#f5f3ff' }}>
        <p className="uppercase tracking-widest text-[10px] mb-8" style={{ color: PURPLE }}>Faltan</p>
        <div className="flex gap-6 md:gap-10 justify-center">
          {[{ l: 'Días', v: t.days }, { l: 'Horas', v: t.hours }, { l: 'Min', v: t.minutes }, { l: 'Seg', v: t.seconds }].map(({ l, v }) => (
            <div key={l}>
              <div
                className="tabular-nums font-bold"
                style={{ ...SERIF, fontSize: 'clamp(2.5rem, 8vw, 4rem)', color: PURPLE }}
              >
                {String(v).padStart(2, '0')}
              </div>
              <p className="text-[9px] uppercase tracking-widest mt-1" style={{ color: '#A78BFA' }}>{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Event info */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <Star size={16} fill="#DDD6FE" className="mx-auto mb-5 text-purple-300" />
          <h2 className="text-3xl text-gray-800 mb-8 font-medium" style={SERIF}>Información del evento</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { emoji: '⛪', t: 'Misa de XV años', time: '18:00 hrs', venue: 'Catedral de Nuestra Señora de la Asunción', addr: 'Av. Zaragoza, Villahermosa, Tabasco' },
              { emoji: '🎂', t: 'Recepción & Fiesta', time: '20:00 hrs', venue: 'Salón El Palacio', addr: 'Blvd. Grijalva #1200, Villahermosa' },
            ].map((ev) => (
              <div key={ev.t} className="border border-purple-100 rounded-2xl p-6 text-center" style={{ background: '#faf7ff' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl" style={{ background: '#ede9fe' }}>{ev.emoji}</div>
                <h3 className="text-base text-gray-800 mb-2 font-semibold">{ev.t}</h3>
                <p className="font-semibold text-sm" style={{ color: PURPLE }}>15 de Agosto · {ev.time}</p>
                <p className="text-gray-700 text-sm mt-2 font-medium">{ev.venue}</p>
                <p className="text-gray-400 text-xs mt-0.5">{ev.addr}</p>
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-xs underline mt-3 inline-block" style={{ color: PURPLE }}>Ver en Google Maps →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-12" style={{ background: '#f5f3ff' }}>
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-center text-xs uppercase tracking-[0.4em] mb-8" style={{ color: '#A78BFA', ...SERIF }}>Galería</p>
          <div className="grid grid-cols-3 gap-2 md:gap-3">
            {GALLERY.map((src) => (
              <div key={src} className="aspect-square overflow-hidden rounded-xl">
                <img src={src} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-purple-300 mt-4">Hasta 6 fotos incluidas en este paquete</p>
        </div>
      </section>

      {/* Dress code */}
      <section className="py-12 text-white text-center px-6" style={{ background: PURPLE }}>
        <p className="uppercase tracking-[0.4em] text-[10px] mb-3 text-purple-200">Código de vestimenta</p>
        <h3 className="text-2xl font-medium mb-2" style={SERIF}>Formal · Color libre</h3>
        <p className="text-purple-200/70 text-sm">El morado está reservado para Isabella. Todo lo demás, ¡bienvenido!</p>
        <div className="flex justify-center gap-3 mt-5">
          {['#F9A8D4', '#FDE68A', '#A7F3D0', '#BAE6FD', '#FCA5A5'].map((c) => (
            <div key={c} className="w-8 h-8 rounded-full border-2 border-white/20 shadow-md" style={{ backgroundColor: c }} />
          ))}
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-14 text-center px-6 bg-white">
        <h2 className="text-2xl text-gray-800 mb-2 font-medium" style={SERIF}>¿Necesitas más información?</h2>
        <p className="text-gray-500 text-sm mb-6">Contáctanos por WhatsApp, con gusto te ayudamos</p>
        <a
          href={`https://wa.me/529932228936?text=${encodeURIComponent('Hola, tengo una pregunta sobre los XV años de Isabella 🎀')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-white font-semibold px-8 py-3.5 rounded-full transition-all shadow-lg text-sm"
          style={{ background: PURPLE }}
        >
          💬 Escribir por WhatsApp
        </a>
      </section>
    </div>
  )
}
