import { useEffect, useState } from 'react'
import { wa } from '@/datos'
import { cn } from '@/lib/utils'
import { Areas, Portada, Razones } from './Arriba'
import { Horario } from './Horario'
import { Planes, QuePlan } from './Planes'
import { useTasa } from '@/lib/moneda'
import { Coaches, Pie, Preguntas, Ubicacion } from './Abajo'

const ENLACES = [
  { href: '#horario', texto: 'Horario' },
  { href: '#planes', texto: 'Planes' },
  { href: '#areas', texto: 'Áreas' },
  { href: '#ubicacion', texto: 'Ubicación' },
]

export function App() {
  const tasa = useTasa()
  const [solido, setSolido] = useState(false)

  // Encabezado transparente sobre la portada; sólido al bajar
  useEffect(() => {
    const revisar = () => setSolido(scrollY > 40)
    revisar()
    addEventListener('scroll', revisar, { passive: true })
    return () => removeEventListener('scroll', revisar)
  }, [])

  return (
    <>
      <a href="#contenido" className="solo-lector focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-senal focus:p-3 focus:text-grafito">Saltar al contenido</a>
      <header className={cn('fixed inset-x-0 top-0 z-30 transition-colors duration-300', solido ? 'bg-grafito/95 shadow-[0_1px_0_rgb(241_238_230/0.08)]' : 'bg-transparent')}>
        <div className="contenedor flex h-16 items-center justify-between gap-6 text-hueso">
          <a href="#" className="titular text-3xl" aria-label="CARGA, inicio">CARGA</a>
          <nav aria-label="Secciones" className="hidden gap-7 md:flex">
            {ENLACES.map((e) => <a key={e.href} href={e.href} className="font-semibold text-hueso/85 hover:text-hueso">{e.texto}</a>)}
          </nav>
          <a className="boton boton--senal min-h-[42px] px-4 text-[0.95rem]" href={wa('Hola CARGA, quiero agendar mi clase de prueba gratis.')} target="_blank" rel="noopener">
            Clase gratis
          </a>
        </div>
      </header>
      <main id="contenido">
        <Portada />
        <Razones />
        <Horario />
        <Areas />
        <QuePlan tasa={tasa} />
        <Planes tasa={tasa} />
        <Coaches />
        <Preguntas />
        <Ubicacion />
      </main>
      <Pie />
    </>
  )
}
