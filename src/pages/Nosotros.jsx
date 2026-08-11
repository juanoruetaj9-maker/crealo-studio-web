import { Link } from 'react-router-dom'
import { ArrowRight, Target, Eye, Globe } from 'lucide-react'
import { motion } from 'framer-motion'

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
})

const stagger = { initial: {}, whileInView: {}, transition: { staggerChildren: 0.08 } }

const valores = [
  {
    img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=700&q=80',
    title: 'Claridad',
    desc: 'Explicamos todo de forma sencilla, sin tecnicismos. El cliente siempre sabe qué está pasando y por qué.',
  },
  {
    img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=700&q=80',
    title: 'Confianza',
    desc: 'Somos transparentes en precios, tiempos y procesos. Lo que cotizamos es lo que entregamos.',
  },
  {
    img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=700&q=80',
    title: 'Calidad',
    desc: 'Cada proyecto recibe atención real. No somos una fábrica de páginas. Somos un estudio con criterio visual.',
  },
  {
    img: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=700&q=80',
    title: 'Cercanía',
    desc: 'Acompañamos al cliente en todo el proceso. Nunca se siente solo ni perdido trabajando con nosotros.',
  },
]

export default function Nosotros() {
  return (
    <div style={{ backgroundColor: '#F8F8F8' }}>

      {/* Header */}
      <section style={{ backgroundColor: '#080808' }} className="pt-14 pb-16 md:pt-20 md:pb-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <motion.div {...inView()}>
            <span className="text-[11px] font-semibold text-[#444] uppercase tracking-[0.22em]">Quiénes somos</span>
            <h1 className="font-display font-black text-white text-[clamp(2.8rem,8vw,6rem)] tracking-tight leading-none mt-3 max-w-2xl">
              Diseño profesional<br />
              para momentos<br />
              <em className="not-italic text-[#FF2D78]">reales.</em>
            </h1>
            <p className="text-[#555] text-base leading-relaxed mt-5 max-w-md">
              Un estudio creativo y digital que transforma tus eventos más importantes en experiencias digitales profesionales, claras y memorables.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Historia */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#F8F8F8' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div {...inView()} className="order-2 lg:order-1">
              <div className="rounded-xl overflow-hidden aspect-[4/5] border border-black/8">
                <img
                  src="/imagenes/nosotros/studio.jpg"
                  alt="Equipo Crealo Estudio"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </motion.div>

            <motion.div {...inView(0.1)} className="order-1 lg:order-2">
              <span className="text-[11px] font-semibold text-[#999] uppercase tracking-[0.22em]">Nuestra historia</span>
              <h2 className="font-display font-black text-[#111] text-3xl md:text-4xl tracking-tight mt-3 mb-6">
                Nació de una pregunta sencilla
              </h2>
              <div className="flex flex-col gap-4 text-sm text-[#666] leading-relaxed">
                <p>
                  Crealo Estudio nació con una pregunta sencilla: ¿por qué las bodas, los XV años y las celebraciones más importantes de la vida terminan con invitaciones digitales genéricas, sin identidad ni cuidado visual?
                </p>
                <p>
                  Bodas soñadas con invitaciones de plantilla. XV años cuidados al detalle con una tarjeta digital genérica. Baby showers y cumpleaños especiales sin nada que reflejara su importancia. El problema no era falta de cariño por el evento, sino falta de acceso a diseño profesional real y accesible.
                </p>
                <p>
                  Decidimos resolver exactamente eso. No con tecnología complicada ni términos corporativos, sino con diseño honesto, acompañamiento cercano y precios que tienen sentido.
                </p>
                <p className="font-semibold text-[#111]">
                  Hoy ayudamos a personas de toda México a vivir sus eventos más importantes con una experiencia digital tan especial como la ocasión.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Banda imagen */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1518638150340-f706e86654de?w=1600&q=80"
          alt="Crealo Estudio en México"
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(8,8,8,0.65)' }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center">
          <p className="font-display font-black text-white text-[clamp(1.6rem,4vw,3rem)] tracking-tight leading-tight max-w-2xl">
            "Te ayudamos a verte profesional de una forma clara, moderna y sin complicarte."
          </p>
          <p className="text-[#666] text-xs mt-4 uppercase tracking-[0.25em] font-semibold">
            — Promesa de Crealo Estudio
          </p>
        </div>
      </div>

      {/* Misión / Visión */}
      <section className="py-20 md:py-24" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <motion.div {...inView()}
              className="bg-[#F8F8F8] rounded-2xl p-8 border border-black/8"
            >
              <div className="w-10 h-10 rounded-xl bg-[#FF2D78]/20 flex items-center justify-center mb-5">
                <Target size={20} className="text-[#FF2D78]" />
              </div>
              <h3 className="font-display font-bold text-xl text-[#111] mb-3">Misión</h3>
              <p className="text-sm text-[#666] leading-relaxed">
                Ayudar a las personas a celebrar sus eventos más importantes — bodas, XV años, baby shower y cumpleaños especiales — con experiencias digitales creativas, modernas y accesibles, ofreciendo acompañamiento cercano, diseño profesional y soluciones fáciles de entender.
              </p>
            </motion.div>

            <motion.div {...inView(0.1)}
              className="bg-[#F8F8F8] rounded-2xl p-8 border border-black/8"
            >
              <div className="w-10 h-10 rounded-xl bg-[#FF2D78]/20 flex items-center justify-center mb-5">
                <Eye size={20} className="text-[#FF2D78]" />
              </div>
              <h3 className="font-display font-bold text-xl text-[#111] mb-3">Visión</h3>
              <p className="text-sm text-[#666] leading-relaxed">
                Convertirnos en el estudio creativo y digital de referencia en México, reconocido por diseño premium amigable, acompañamiento real y resultados visuales que generan confianza y abren puertas.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#F8F8F8' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <motion.div {...inView()} className="mb-12">
            <span className="text-[11px] font-semibold text-[#999] uppercase tracking-[0.22em]">Valores</span>
            <h2 className="font-display font-black text-[#111] text-4xl md:text-5xl tracking-tight mt-2">
              Lo que nos define
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {valores.map((v, i) => (
              <motion.div key={v.title} {...inView(i * 0.07)}
                className="group rounded-xl overflow-hidden bg-white border border-black/8 hover:border-[#FF2D78]/30 shadow-sm transition-all duration-200"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={v.img}
                    alt={v.title}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-[#111] mb-1.5">{v.title}</h3>
                  <p className="text-xs text-[#555] leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Segunda banda imagen */}
      <div className="relative h-56 md:h-72 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1600&q=80"
          alt="Estudio creativo"
          loading="lazy"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(8,8,8,0.6)' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-[11px] font-bold text-white/40 uppercase tracking-[0.3em]">
            Crealo Estudio · México
          </p>
        </div>
      </div>

      {/* Ecosistema */}
      <section className="py-16" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-10">
          <motion.div {...inView()}
            className="flex flex-col md:flex-row items-center gap-6 bg-[#F8F8F8] rounded-2xl p-7 border border-black/8"
          >
            <div className="w-12 h-12 rounded-xl bg-[#FF2D78]/20 flex items-center justify-center shrink-0">
              <Globe size={22} className="text-[#FF2D78]" />
            </div>
            <div>
              <h3 className="font-display font-bold text-[#111] mb-1">
                Parte del ecosistema Social Ventura
              </h3>
              <p className="text-sm text-[#555] leading-relaxed">
                Crealo Estudio pertenece a Social Ventura, un ecosistema de marcas tecnológicas y creativas construido en México con vocación de largo plazo. Esto significa respaldo, procesos sólidos y una red de capacidades que crece con el tiempo.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#FF2D78] py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <h2 className="font-display font-black text-black tracking-tight leading-none text-[clamp(3rem,9vw,7rem)]">
            ¿Empezamos?
          </h2>
          <div className="flex flex-col gap-3">
            <Link to="/contacto"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-black text-white font-bold rounded-xl text-sm hover:bg-[#111] transition-colors cursor-pointer"
            >
              Escribirnos ahora <ArrowRight size={14} />
            </Link>
            <a href="https://wa.me/529932228936" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-black/20 text-black font-semibold rounded-xl text-sm hover:border-black/40 transition-colors cursor-pointer"
            >
              WhatsApp directo
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
