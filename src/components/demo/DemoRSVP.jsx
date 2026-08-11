import { Check } from 'lucide-react'
import DemoCardShell from './DemoCardShell'

// modo="estatico" (Fase 1): mockup del Google Form brandado, no envía datos.
// FASE 2: aquí se enlazará el Google Form real, preconfigurado y brandado
// para el evento del cliente (Crealo no gestiona la base de datos de RSVP).
export default function DemoRSVP({ evento, paquete, modo = 'estatico' }) {
  return (
    <DemoCardShell label="RSVP" data-evento={evento?.id} data-paquete={paquete?.id} data-modo={modo}>
      <div className="aspect-[4/5] rounded-xl bg-[#FFF5F7] p-4 flex flex-col gap-3">
        <p className="text-[11px] font-semibold text-[#111]">¿Nos acompañas?</p>
        <div className="flex flex-col gap-2">
          {['Sí, ahí estaré', 'No podré asistir'].map((op, i) => (
            <div key={op} className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-black/6">
              <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${i === 0 ? 'border-[#FF2D78] bg-[#FF2D78]' : 'border-[#ccc]'}`}>
                {i === 0 && <Check size={9} className="text-white" />}
              </span>
              <span className="text-[10px] text-[#555]">{op}</span>
            </div>
          ))}
        </div>
        <div className="mt-auto text-[9px] text-[#999]">Formulario brandado con tu evento</div>
      </div>
    </DemoCardShell>
  )
}
