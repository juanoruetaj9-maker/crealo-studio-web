import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, ArrowRight, MessageCircle, Search, FileText, Palette, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
})

const pasos = [
  {
    num: '01',
    title: 'Nos contactas',
    desc: 'Escríbenos por WhatsApp o llena el formulario de contacto. Te respondemos en menos de 24 horas con un saludo real, no un bot.',
    icon: MessageCircle,
    detalles: [
      'Respuesta garantizada en menos de 24 horas',
      'Sin formularios complicados',
      'Puedes enviarnos por WhatsApp o por el formulario',
      'Primero escuchamos, luego vendemos',
    ],
  },
  {
    num: '02',
    title: 'Entendemos tu proyecto',
    desc: 'Hablamos de tu evento para entender exactamente lo que necesitas. Eliges una plantilla de nuestra galería o nos mandas tu propia referencia — así sabemos exactamente qué imaginas.',
    icon: Search,
    detalles: [
      'Elige una plantilla de la galería o manda tu referencia',
      'Tipo de evento, fecha, estilo visual',
      'Nombres, lugar y detalles que quieres destacar',
      'Sin presión, sin urgencias artificiales',
    ],
  },
  {
    num: '03',
    title: 'Cotizamos claro',
    desc: 'Te enviamos una cotización ordenada con exactamente qué incluye, qué no incluye, tiempo de entrega y forma de pago. Sin sorpresas.',
    icon: FileText,
    detalles: [
      'Cotización por escrito, sin ambigüedades',
      'Tiempo de entrega estimado',
      'Desglose de qué incluye y qué no',
      'Anticipo del 50% para comenzar',
    ],
  },
  {
    num: '04',
    title: 'Producimos juntos',
    desc: 'Trabajamos con comunicación constante. Te mantenemos informado al inicio, a la mitad y cuando hay algo importante. Sin silencio radio.',
    icon: Palette,
    detalles: [
      'Actualización al inicio del proyecto',
      'Avance intermedio para que veas el progreso',
      'Vista previa antes de entrega final',
      'Hasta 2 rondas de ajustes incluidas',
    ],
  },
  {
    num: '05',
    title: 'Entregamos y te acompañamos',
    desc: 'Recibís el proyecto terminado, te lo explicamos y resolvemos tus dudas. Después del cierre seguimos disponibles para lo que necesites.',
    icon: CheckCircle,
    detalles: [
      'Entrega con explicación paso a paso',
      'Resolución de dudas sin costo adicional',
      'Cierre formal con pago final del 50%',
      'Postventa: disponibles para seguimiento',
    ],
  },
]

const faqs = [
  {
    q: '¿Cuánto tiempo tardan los proyectos?',
    a: 'Depende del paquete: las invitaciones web tardan entre 4 y 10 días hábiles según el paquete elegido. Si necesitas urgencia, hay una tarifa adicional del 30%.',
  },
  {
    q: '¿Puedo hacer cambios después de la entrega?',
    a: 'Sí. Incluimos 2 rondas de cambios dentro del proceso de producción. Los cambios solicitados después de la entrega final tienen un costo adicional de $200 MXN por ronda.',
  },
  {
    q: '¿Necesito dar anticipo?',
    a: 'Sí. Solicitamos el 50% del total para comenzar el proyecto. El 50% restante se paga al momento de la entrega final. Para proyectos premium el esquema puede ser 60/40.',
  },
  {
    q: '¿Qué necesito tener listo para empezar?',
    a: 'Nombres, fecha, dirección del evento, fotos si las hay y referencia de estilo visual. Con eso ya podemos empezar.',
  },
  {
    q: '¿Trabajan con clientes de todo el país?',
    a: 'Sí. Trabajamos de forma 100% remota y atendemos clientes de cualquier parte de México. La comunicación es por WhatsApp, correo y videollamada cuando es necesario.',
  },
  {
    q: '¿La invitación web tiene fecha de vencimiento?',
    a: 'Las invitaciones web se mantienen activas durante todo el período de necesidad del evento. Podemos gestionar la extensión o eliminación según lo requieras.',
  },
]

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-black/8 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center justify-between w-full py-5 text-left gap-4 transition-colors cursor-pointer ${open ? 'text-[#FF2D78]' : 'text-[#111] hover:text-[#FF2D78]'}`}
      >
        <span className="font-semibold text-sm pr-4">{q}</span>
        <ChevronDown
          size={17}
          className={`shrink-0 transition-transform duration-200 ${open ? 'rotate-180 text-[#FF2D78]' : 'text-[#444]'}`}
        />
      </button>
      {open && (
        <div className="pb-5">
          <p className="text-sm text-[#666] leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  )
}

export default function Proceso() {
  return (
    <div style={{ backgroundColor: '#F8F8F8' }}>

      {/* Header */}
      <section style={{ backgroundColor: '#080808' }} className="pt-14 pb-16 md:pt-20 md:pb-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <motion.div {...inView()}>
            <span className="text-[11px] font-semibold text-[#444] uppercase tracking-[0.22em]">Cómo trabajamos</span>
            <h1 className="font-display font-black text-white text-[clamp(2.8rem,8vw,6rem)] tracking-tight leading-none mt-3 max-w-2xl">
              Simple, claro<br />y sin sorpresas.
            </h1>
            <p className="text-[#555] text-base leading-relaxed mt-5 max-w-md">
              Desde el primer mensaje hasta la entrega final, el cliente siempre sabe qué está pasando. Así es como trabajamos.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pasos */}
      <section className="py-14 md:py-20" style={{ backgroundColor: '#F8F8F8' }}>
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-4">
            {pasos.map((paso, i) => (
              <motion.div key={paso.num} {...inView(i * 0.06)}>
                <div className="flex flex-col md:flex-row gap-6 p-7 rounded-xl bg-white border border-black/8 hover:border-[#FF2D78]/20 shadow-sm transition-all duration-200">
                  {/* Left: number + icon */}
                  <div className="flex md:flex-col items-center md:items-center gap-4 md:gap-3 shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-[#FF2D78]/15 flex items-center justify-center shrink-0">
                      <paso.icon size={22} className="text-[#FF2D78]" />
                    </div>
                    <span className="font-display font-black text-4xl text-[#FF2D78]/20 hidden md:block leading-none">
                      {paso.num}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] font-bold text-[#FF2D78] bg-[#FF2D78]/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Paso {i + 1}
                      </span>
                      <h3 className="font-display font-bold text-lg text-[#111]">{paso.title}</h3>
                    </div>
                    <p className="text-sm text-[#666] leading-relaxed mb-4">{paso.desc}</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {paso.detalles.map((d) => (
                        <li key={d} className="flex items-center gap-2 text-xs text-[#555]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF2D78] shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                    {paso.num === '02' && (
                      <Link to="/plantillas"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FF2D78] hover:text-[#E0155F] transition-colors cursor-pointer mt-4"
                      >
                        Ver galería de plantillas <ArrowRight size={12} />
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-10">
          <motion.div {...inView()} className="text-center mb-10">
            <span className="text-[11px] font-semibold text-[#999] uppercase tracking-[0.22em]">Preguntas frecuentes</span>
            <h2 className="font-display font-black text-[#111] text-2xl md:text-3xl tracking-tight mt-3">
              Dudas comunes, respuestas directas
            </h2>
          </motion.div>

          <div className="bg-[#F8F8F8] rounded-2xl border border-black/8 px-6 py-2">
            {faqs.map((faq) => (
              <FaqItem key={faq.q} {...faq} />
            ))}
          </div>
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
              Cotizar proyecto <ArrowRight size={14} />
            </Link>
            <a href="https://wa.me/529932228936?text=Hola%20Crealo%20Estudio%2C%20tengo%20una%20pregunta."
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-black/20 text-black font-semibold rounded-xl text-sm hover:border-black/40 transition-colors cursor-pointer"
            >
              Preguntar por WhatsApp
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
