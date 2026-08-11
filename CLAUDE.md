# Crealo Estudio — Sitio Web

## Revisión de código

Usa la skill `scoped-review` (`~/.claude/skills/scoped-review/SKILL.md`) antes de cualquier commit/push no trivial o al correr `/code-review`.

## Seguridad — Desarrollo → Producción

Sitio estático sin base de datos propia — checklist ligero, enfocado en
hosting y cuentas (no aplica RLS/multi-tenant porque no hay backend/DB aquí).

- `.env` local (si se agrega alguno, ej. para un formulario de contacto o
  analytics) nunca se commitea; variables de producción se configuran en el
  dashboard de Vercel, no copiando el `.env` local.
- Cualquier API key de terceros (formularios, analytics, mapas) que se agregue
  a futuro: revisar si debe ir server-side antes de exponerla en el frontend.
- 2FA activo en las cuentas de plataforma (GitHub, Vercel) — es el sitio
  público de la marca, un acceso comprometido afecta la reputación de Crealo
  Studio directamente.
- Rama `main` protegida con PR obligatorio si en algún momento se suma alguien
  externo al equipo con acceso de push.
- Rotar tokens/accesos si un colaborador sale del equipo.
