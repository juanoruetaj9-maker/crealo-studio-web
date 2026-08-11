import { useState, useRef } from 'react'
import { MessageCircle, Mail, MapPin, Clock, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const WHATSAPP_NUMBER = '529932228936'
const EMAIL = 'hola@crealoestudio.mx'

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
})

function buildWaMessage({ nombre, tipo, mensaje }) {
  const lines = [
    `Hola Crealo Estudio`,
    ``,
    `*Nombre:* ${nombre || '(sin nombre)'}`,
    `*Tipo de proyecto:* ${tipo || '(sin especificar)'}`,
    `*Descripción:* ${mensaje || '(sin descripción)'}`,
    ``,
    `Quiero cotizar este proyecto.`,
  ]
  return encodeURIComponent(lines.join('\n'))
}

export default function Contacto() {
  const [form, setForm] = useState({ nombre: '', tipo: '', mensaje: '' })
  const [nombreTouched, setNombreTouched] = useState(false)
  const nombreRef = useRef(null)
  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  const nombreValid = form.nombre.trim().length > 0
  const nombreShowError = nombreTouched && !nombreValid
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${buildWaMessage(form)}`

  const handleWaClick = (e) => {
    if (!nombreValid) {
      e.preventDefault()
      setNombreTouched(true)
      nombreRef.current?.focus()
    }
  }

  const inputClass = "bg-white border border-black/10 text-[#111] placeholder-[#aaa] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#FF2D78] focus:border-[#FF2D78]/50 transition-all w-full"
  const labelClass = "block text-[#555] text-xs font-semibold uppercase tracking-[0.12em] mb-2"

  return (
    <div style={{ backgroundColor: '#F8F8F8' }}>

      {/* Header */}
      <section style={{ backgroundColor: '#080808' }} className="pt-14 pb-16 md:pt-20 md:pb-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <motion.div {...inView()}>
            <span className="text-[11px] font-semibold text-[#444] uppercase tracking-[0.22em]">Contacto</span>
            <h1 className="font-display font-black text-white text-[clamp(2.8rem,8vw,6rem)] tracking-tight leading-none mt-3 max-w-2xl">
              Empieza hoy.
            </h1>
            <p className="text-[#555] text-base leading-relaxed mt-5 max-w-md">
              Cuéntanos tu proyecto y te respondemos en menos de 24 horas con una cotización clara y sin compromisos.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <section className="pb-20 md:pb-28" style={{ backgroundColor: '#F8F8F8' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* Form */}
            <motion.div {...inView()}>
              <h2 className="font-display font-bold text-xl text-[#111] mb-7">
                Cuéntanos tu proyecto
              </h2>

              <div className="flex flex-col gap-5">
                <div>
                  <label className={labelClass}>Tu nombre *</label>
                  <input
                    ref={nombreRef}
                    type="text"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    onBlur={() => setNombreTouched(true)}
                    placeholder="Ej. Ana García"
                    aria-invalid={nombreShowError}
                    className={`${inputClass} ${nombreShowError ? 'border-red-500/60 focus:ring-red-500/60 focus:border-red-500/60' : ''}`}
                  />
                  {nombreShowError && (
                    <p className="text-xs text-red-600 mt-1.5">Escribe tu nombre para poder enviar tu mensaje.</p>
                  )}
                </div>

                <div>
                  <label className={labelClass}>¿Qué tipo de proyecto necesitas?</label>
                  <select
                    name="tipo"
                    value={form.tipo}
                    onChange={handleChange}
                    className={inputClass}
                    style={{ backgroundColor: '#fff' }}
                  >
                    <option value="">Selecciona una opción...</option>
                    <option value="Invitación web - Boda">Invitación web — Boda</option>
                    <option value="Invitación web - XV Años">Invitación web — XV Años</option>
                    <option value="Invitación web - Baby Shower">Invitación web — Baby Shower</option>
                    <option value="Invitación web - Cumpleaños Especial">Invitación web — Cumpleaños Especial</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Cuéntanos más (opcional)</label>
                  <textarea
                    name="mensaje"
                    value={form.mensaje}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Ej. Necesito una invitación para mi boda el 15 de febrero en Mérida, para aprox. 120 personas. Me gustaría algo elegante y moderno."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <div className="pt-1">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleWaClick}
                    aria-disabled={!nombreValid}
                    className={`flex items-center justify-center gap-3 w-full py-4 rounded-xl font-bold text-white text-sm shadow-md transition-all cursor-pointer ${nombreValid ? 'hover:shadow-lg' : 'opacity-50'}`}
                    style={{ backgroundColor: '#25D366' }}
                  >
                    <svg viewBox="0 0 24 24" fill="white" width="18" height="18">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Enviar por WhatsApp
                  </a>
                  <p className="text-xs text-[#999] text-center mt-3">
                    Al hacer clic, se abrirá WhatsApp con tu mensaje pre-escrito. Sin presión.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-black/8" />
                  <span className="text-xs text-[#999]">o también</span>
                  <div className="flex-1 h-px bg-black/8" />
                </div>

                <a
                  href={`mailto:${EMAIL}?subject=Cotización de proyecto&body=Hola Crealo Estudio, me gustaría cotizar...`}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl border border-black/10 text-[#555] text-sm font-semibold hover:border-[#FF2D78] hover:text-[#FF2D78] transition-all cursor-pointer"
                >
                  <Mail size={15} />
                  Enviar por correo
                </a>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div {...inView(0.1)} className="flex flex-col gap-4">

              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer"
                className="group flex items-center gap-4 p-5 rounded-xl border border-black/8 bg-white shadow-sm hover:border-[#FF2D78]/20 transition-all duration-200 cursor-pointer"
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: '#25D366' }}>
                  <MessageCircle size={20} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-[#111] text-sm">WhatsApp directo</p>
                  <p className="text-xs text-[#999] mt-0.5">Respuesta en menos de 24 horas</p>
                </div>
                <ArrowRight size={15} className="text-[#ccc] group-hover:text-[#FF2D78] transition-colors duration-200" />
              </a>

              <a href={`mailto:${EMAIL}`}
                className="group flex items-center gap-4 p-5 rounded-xl border border-black/8 bg-white shadow-sm hover:border-[#FF2D78]/20 transition-all duration-200 cursor-pointer"
              >
                <div className="w-11 h-11 rounded-xl bg-[#FF2D78]/15 flex items-center justify-center shrink-0">
                  <Mail size={20} className="text-[#FF2D78]" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-[#111] text-sm">{EMAIL}</p>
                  <p className="text-xs text-[#999] mt-0.5">Para proyectos formales y empresas</p>
                </div>
                <ArrowRight size={15} className="text-[#ccc] group-hover:text-[#FF2D78] transition-colors duration-200" />
              </a>

              <div className="flex items-center gap-4 p-5 rounded-xl border border-black/8 bg-white shadow-sm">
                <div className="w-11 h-11 rounded-xl bg-black/5 flex items-center justify-center shrink-0">
                  <MapPin size={20} className="text-[#555]" />
                </div>
                <div>
                  <p className="font-semibold text-[#111] text-sm">México</p>
                  <p className="text-xs text-[#999] mt-0.5">Atendemos toda la república</p>
                  <p className="text-xs text-[#bbb] mt-0.5">Trabajamos 100% remoto</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 rounded-xl border border-black/8 bg-white shadow-sm">
                <div className="w-11 h-11 rounded-xl bg-black/5 flex items-center justify-center shrink-0">
                  <Clock size={20} className="text-[#555]" />
                </div>
                <div>
                  <p className="font-semibold text-[#111] text-sm">Respondemos rápido</p>
                  <p className="text-xs text-[#999] mt-0.5">Tiempo promedio: menos de 8 horas</p>
                  <p className="text-xs text-[#bbb] mt-0.5">Lunes a sábado, 9:00–19:00 h</p>
                </div>
              </div>

              {/* Promise box */}
              <div className="p-6 rounded-xl bg-[#FF2D78]">
                <p className="font-display font-bold text-black text-sm mb-3">
                  Nuestra promesa de contacto
                </p>
                <ul className="flex flex-col gap-2">
                  {[
                    'Respondemos en menos de 24 horas',
                    'Cotización sin costo y sin compromiso',
                    'Sin presión, sin ventas agresivas',
                    'Explicamos todo fácil',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-black/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-black/30 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

            </motion.div>
          </div>
        </div>
      </section>

    </div>
  )
}
