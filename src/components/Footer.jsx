import { Link } from 'react-router-dom'
import { ESTILOS } from '../data/plantillas'

function IgIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  )
}

function FbIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )
}

const links = [
  { to: '/servicios', label: 'Servicios' },
  { to: '/portafolio', label: 'Portafolio' },
  { to: '/proceso', label: 'Proceso' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/contacto', label: 'Contacto' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ backgroundColor: '#080808' }} className="border-t border-white/8">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-12 md:py-16">

        {/* Main row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">

          {/* Brand */}
          <div>
            <Link to="/" className="font-display font-black text-white text-lg tracking-tight hover:text-[#FF2D78] transition-colors duration-200 cursor-pointer">
              Crealo Estudio
            </Link>
            <p className="text-[12px] text-[#444] mt-2 max-w-xs leading-relaxed">
              Estudio creativo y digital · México<br />
              Diseño que no se olvida.
            </p>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {links.map(({ to, label }) => (
              <Link key={to} to={to}
                className="text-[11px] font-semibold text-[#555] uppercase tracking-[0.15em] hover:text-white transition-colors duration-200 cursor-pointer"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Social + CTA */}
          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/crealo_estudio_digital" target="_blank" rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-lg border border-white/10 text-[#555] hover:text-white hover:border-white/30 flex items-center justify-center transition-all duration-200 cursor-pointer"
            >
              <IgIcon />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61590476165059" target="_blank" rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-9 h-9 rounded-lg border border-white/10 text-[#555] hover:text-white hover:border-white/30 flex items-center justify-center transition-all duration-200 cursor-pointer"
            >
              <FbIcon />
            </a>
            <Link to="/contacto"
              className="ml-2 px-5 py-2.5 bg-[#FF2D78] text-black text-[11px] font-black uppercase tracking-widest rounded-lg hover:bg-[#E0155F] transition-colors duration-200 cursor-pointer"
            >
              Cotizar
            </Link>
          </div>
        </div>

        {/* Plantillas por estilo (SEO) */}
        <div className="mt-10 pt-8 border-t border-white/8">
          <p className="text-[10px] font-bold text-[#333] uppercase tracking-widest mb-3">Invitaciones por estilo</p>
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {ESTILOS.map((e) => (
              <Link key={e.id} to={`/plantillas/${e.id}`}
                className="text-[11px] text-[#444] hover:text-white transition-colors duration-200 cursor-pointer"
              >
                Invitaciones {e.nombre.toLowerCase()}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#333] font-medium">
          <p>© {year} Crealo Estudio — Todos los derechos reservados</p>
          <p>Parte del ecosistema <span className="text-[#444]">Social Ventura</span> · México</p>
        </div>
      </div>
    </footer>
  )
}
