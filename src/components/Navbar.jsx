import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { to: '/servicios', label: 'Servicios' },
  { to: '/plantillas', label: 'Plantillas' },
  { to: '/portafolio', label: 'Portafolio' },
  { to: '/proceso', label: 'Proceso' },
  { to: '/nosotros', label: 'Nosotros' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header className="fixed top-4 left-4 right-4 z-50">
        <div className={`flex items-center justify-between h-12 px-5 rounded-xl border transition-all duration-300 ${
          scrolled
            ? 'bg-[#080808]/95 backdrop-blur-xl border-white/10 shadow-xl shadow-black/40'
            : 'bg-[#080808]/70 backdrop-blur-md border-white/8'
        }`}>

          {/* Logo */}
          <Link to="/" className="flex items-center cursor-pointer">
            <img
              src="/logos/Isotipo%20Crealo.png"
              alt="Crealo Estudio"
              className="h-8 w-auto object-contain"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(({ to, label }) => (
              <NavLink key={to} to={to}
                className={({ isActive }) =>
                  `text-[11px] font-semibold uppercase tracking-[0.15em] transition-colors duration-200 ${
                    isActive ? 'text-[#FF2D78]' : 'text-[#666] hover:text-white'
                  }`
                }
              >{label}</NavLink>
            ))}
          </nav>

          {/* CTA */}
          <NavLink to="/contacto"
            className={({ isActive }) =>
              `hidden md:inline-flex items-center px-4 py-2 rounded-lg text-[11px] font-bold uppercase tracking-widest transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[#E0155F] text-black'
                  : 'bg-[#FF2D78] text-black hover:bg-[#E0155F]'
              }`
            }
          >
            Contactar
          </NavLink>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Abrir menú"
            className="md:hidden text-white hover:text-[#FF2D78] transition-colors duration-200 cursor-pointer p-1"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden mt-2 rounded-xl border border-white/10 bg-[#080808]/98 backdrop-blur-xl overflow-hidden">
            <div className="p-3 flex flex-col gap-1">
              {navLinks.map(({ to, label }) => (
                <NavLink key={to} to={to}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer ${
                      isActive ? 'text-[#FF2D78] bg-white/5' : 'text-[#888] hover:text-white hover:bg-white/5'
                    }`
                  }
                >{label}</NavLink>
              ))}
              <Link to="/contacto"
                className="mt-1 px-4 py-3 bg-[#FF2D78] text-black text-sm font-bold rounded-lg text-center hover:bg-[#E0155F] transition-colors duration-200 cursor-pointer"
              >
                Contactar
              </Link>
            </div>
          </div>
        )}
      </header>
      <div className="h-20" />
    </>
  )
}
