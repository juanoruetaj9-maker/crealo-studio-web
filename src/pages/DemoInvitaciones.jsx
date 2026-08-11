import { useEffect } from 'react'
import { MapPin, Heart, Music, Camera, ChevronDown } from 'lucide-react'
import DemoBanner from '../components/DemoBanner'
import { useCountdown } from '../hooks/useCountdown'

const WA = `https://wa.me/529932228936?text=${encodeURIComponent('Hola! Vi el ejemplo de invitación web y me encantó. Me gustaría una para mi evento.')}`
const TARGET = new Date('2026-09-19T18:00:00')

const SERIF = { fontFamily: "'Cormorant Garamond', Georgia, serif" }

const gallery = [
  { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80', alt: 'Pareja' },
  { src: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600&q=80', alt: 'Anillos' },
  { src: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&q=80', alt: 'Novia' },
  { src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80', alt: 'Ceremonia' },
  { src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=600&q=80', alt: 'Detalles' },
  { src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80', alt: 'Pastel' },
]

const dressPalette = ['#C9A876', '#8B3252', '#1C3A5F', '#5C4033', '#D4C4B0']

export default function DemoInvitaciones() {
  const time = useCountdown(TARGET)

  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap'
    document.head.appendChild(link)
    return () => document.head.removeChild(link)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <DemoBanner cta="Hola! Vi el ejemplo de invitación web y me encantó. Me gustaría una para mi evento." />

      {/* Hero */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center text-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative z-10 px-6 max-w-3xl mx-auto">
          <p className="text-rose-200 uppercase tracking-[0.5em] text-xs mb-8 font-light">
            El matrimonio de
          </p>
          <h1
            className="text-7xl md:text-[9rem] font-light text-white leading-none mb-6"
            style={SERIF}
          >
            Ana <span className="italic text-rose-300">&</span> Rodrigo
          </h1>
          <div className="flex items-center justify-center gap-5 mb-6">
            <div className="h-px w-20 bg-rose-300/40" />
            <p className="text-rose-100 text-sm tracking-[0.3em] uppercase font-light">
              19 · Septiembre · 2026
            </p>
            <div className="h-px w-20 bg-rose-300/40" />
          </div>
          <p className="text-white/60 text-sm flex items-center gap-2 justify-center mb-10">
            <MapPin size={13} className="text-rose-300" />
            Hacienda San Bernardo, Mérida, Yucatán
          </p>
          <a
            href="#detalles"
            className="inline-block border border-white/30 text-white/90 px-10 py-3.5 rounded-full text-xs tracking-[0.3em] uppercase hover:bg-white/10 transition-all backdrop-blur-sm"
          >
            Ver la invitación
          </a>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 animate-bounce">
          <ChevronDown size={20} />
        </div>
      </section>

      {/* Countdown */}
      <section className="py-16 bg-rose-50">
        <div className="max-w-xl mx-auto text-center px-6">
          <p
            className="text-rose-400 text-sm mb-8 tracking-widest uppercase font-light"
            style={SERIF}
          >
            Cuenta regresiva
          </p>
          <div className="flex gap-4 md:gap-8 justify-center">
            {[
              { label: 'Días', value: time.days },
              { label: 'Horas', value: time.hours },
              { label: 'Minutos', value: time.minutes },
              { label: 'Segundos', value: time.seconds },
            ].map(({ label, value }) => (
              <div key={label} className="text-center min-w-[60px]">
                <div
                  className="text-5xl md:text-6xl text-rose-800 tabular-nums leading-none"
                  style={SERIF}
                >
                  {String(value).padStart(2, '0')}
                </div>
                <p className="text-rose-400 text-[10px] uppercase tracking-widest mt-2">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 px-6">
        <div className="max-w-xl mx-auto text-center">
          <Heart size={18} className="mx-auto text-rose-400 mb-6" fill="currentColor" />
          <h2 className="text-4xl text-gray-800 mb-8 font-light" style={SERIF}>
            Nuestra historia
          </h2>
          <p className="text-gray-500 leading-loose text-base">
            Todo comenzó en una tarde de octubre del 2021, en una librería pequeña del centro histórico de Mérida. Rodrigo buscaba un libro que nunca encontró, y Ana lo ayudó a buscar algo que tampoco sabía que quería.
          </p>
          <p className="text-gray-500 leading-loose text-base mt-4">
            Tres años después, aún seguimos buscando juntos — y hoy queremos que seas parte de este capítulo. Tu presencia es el regalo más grande.
          </p>
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="h-px w-12 bg-rose-200" />
            <Heart size={12} className="text-rose-300" fill="currentColor" />
            <div className="h-px w-12 bg-rose-200" />
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-stone-50 py-14">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center gap-3 justify-center mb-10">
            <Camera size={16} className="text-rose-400" />
            <h2
              className="text-sm uppercase tracking-[0.4em] text-gray-500 font-light"
              style={SERIF}
            >
              Nuestra galería
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
            {gallery.map((img, i) => (
              <div
                key={img.src}
                className={`overflow-hidden rounded-xl ${i === 0 ? 'md:row-span-2' : ''}`}
                style={{ aspectRatio: i === 0 ? undefined : '1' }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className={`w-full ${i === 0 ? 'h-full min-h-48' : 'h-full'} object-cover hover:scale-105 transition-transform duration-700`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section id="detalles" className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl text-gray-800 text-center mb-12 font-light" style={SERIF}>
            Detalles del evento
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                emoji: '⛪',
                title: 'Ceremonia',
                date: '19 de Septiembre, 2026',
                time: '17:00 hrs',
                venue: 'Catedral de Mérida',
                address: 'Plaza Grande, Centro Histórico',
              },
              {
                emoji: '🥂',
                title: 'Recepción',
                date: '19 de Septiembre, 2026',
                time: '19:30 hrs',
                venue: 'Hacienda San Bernardo',
                address: 'Km 15 Carretera Mérida-Uxmal',
              },
            ].map((ev) => (
              <div
                key={ev.title}
                className="border border-rose-100 rounded-2xl p-8 text-center bg-rose-50/30 hover:bg-rose-50 transition-colors"
              >
                <div className="w-14 h-14 rounded-full bg-rose-100 flex items-center justify-center mx-auto mb-5 text-2xl">
                  {ev.emoji}
                </div>
                <h3 className="text-lg text-gray-800 mb-3 font-medium" style={SERIF}>
                  {ev.title}
                </h3>
                <p className="text-gray-500 text-sm">{ev.date}</p>
                <p className="text-rose-600 font-semibold text-sm mt-1">{ev.time}</p>
                <div className="h-px bg-rose-100 my-4 mx-8" />
                <p className="text-gray-700 text-sm font-medium">{ev.venue}</p>
                <p className="text-gray-400 text-xs mt-1">{ev.address}</p>
                <a
                  href="https://maps.google.com"
                  className="inline-block mt-4 text-rose-500 text-xs underline hover:text-rose-700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver en Google Maps →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dress code */}
      <section className="py-14 bg-rose-900 text-white text-center px-6">
        <p className="text-rose-300 uppercase tracking-[0.4em] text-xs mb-4 font-light" style={SERIF}>
          Código de vestimenta
        </p>
        <h3 className="text-3xl font-light mb-3" style={SERIF}>
          Formal elegante
        </h3>
        <p className="text-rose-300/80 text-sm max-w-xs mx-auto mb-8 leading-relaxed">
          Se pide evitar el color blanco. Tonos tierra, vino y azul marino son bienvenidos.
        </p>
        <div className="flex justify-center gap-3">
          {dressPalette.map((color) => (
            <div
              key={color}
              className="w-9 h-9 rounded-full border-2 border-white/20 shadow-lg"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </section>

      {/* Spotify */}
      <section className="py-14 bg-stone-50 text-center px-6">
        <Music size={18} className="mx-auto text-rose-400 mb-4" />
        <h3 className="text-gray-800 font-medium mb-1" style={SERIF}>
          Nuestra playlist
        </h3>
        <p className="text-gray-400 text-sm mb-6">Las canciones que cuentan nuestra historia</p>
        <a
          href="#"
          className="inline-flex items-center gap-2.5 bg-[#1DB954] text-white px-6 py-3 rounded-full text-sm font-semibold shadow-md hover:bg-[#1aa34a] transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
          Escuchar en Spotify
        </a>
      </section>

      {/* CTA */}
      <section
        className="py-24 text-white text-center px-6"
        style={{
          background: 'linear-gradient(135deg, #7f1d1d 0%, #be123c 50%, #9f1239 100%)',
        }}
      >
        <p className="text-rose-300 text-xs uppercase tracking-widest mb-4">Demo creado por Crealo Estudio</p>
        <h2 className="text-4xl md:text-5xl font-light mb-4" style={SERIF}>
          ¿Te enamoraste de esta invitación?
        </h2>
        <p className="text-rose-200 text-sm max-w-sm mx-auto mb-10 leading-relaxed">
          Podemos crear algo así, completamente personalizado para tu evento, con tus colores, tu historia y tu estilo. Desde <strong>$499 MXN</strong>.
        </p>
        <a
          href={WA}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-white text-rose-800 font-bold px-10 py-4 rounded-full hover:bg-rose-50 transition-all shadow-2xl text-sm tracking-wide"
        >
          💍 Quiero la mía
        </a>
        <p className="text-rose-400/60 text-xs mt-6">Respuesta en menos de 24 horas</p>
      </section>
    </div>
  )
}
