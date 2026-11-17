import { abrirMensaje } from '@/lib/mensaje'
import { useEffect, useState } from 'react'
import { CLASES, DIAS, type Tipo } from '@/datos'
import { cn } from '@/lib/utils'

const TIPOS: (Tipo | 'Todas')[] = ['Todas', 'Fuerza', 'Cardio', 'Boxeo', 'Movilidad']

const horaTexto = (min: number) => {
  const h24 = Math.floor(min / 60)
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12
  return `${h12}:${String(min % 60).padStart(2, '0')} ${h24 < 12 ? 'a. m.' : 'p. m.'}`
}

export function Horario() {
  const [ahora, setAhora] = useState(() => new Date())
  const hoy = ahora.getDay()
  const [dia, setDia] = useState(hoy)
  const [tipo, setTipo] = useState<(typeof TIPOS)[number]>('Todas')

  useEffect(() => {
    const reloj = setInterval(() => setAhora(new Date()), 60000)
    return () => clearInterval(reloj)
  }, [])

  const minutos = ahora.getHours() * 60 + ahora.getMinutes()
  const clases = CLASES[dia].filter((c) => tipo === 'Todas' || c.tipo === tipo)
  const proxima = dia === hoy ? CLASES[dia].find((c) => c.hora + c.dura > minutos) : undefined
  const orden = Array.from({ length: 7 }, (_, i) => (hoy + i) % 7)

  return (
    <section id="horario" className="contenedor py-16 md:py-24" aria-labelledby="horario-titulo">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 id="horario-titulo" className="titular text-5xl md:text-6xl">Horario de clases</h2>
          <p className="mt-3 max-w-lg text-gris">Elige el día y el tipo de clase. Reservas tu cupo por WhatsApp; las clases tienen cupo limitado.</p>
        </div>
      </div>

      <div className="mt-8 -mx-1 flex snap-x gap-2 overflow-x-auto px-1 pb-2" role="tablist" aria-label="Día">
        {orden.map((d) => (
          <button
            key={d}
            role="tab"
            type="button"
            aria-selected={d === dia}
            onClick={() => setDia(d)}
            className={cn('min-h-[48px] shrink-0 snap-start rounded-[var(--radius-campo)] border px-4 font-semibold', d === dia ? 'border-grafito bg-grafito text-hueso' : 'border-grafito/20 hover:border-grafito')}
          >
            {d === hoy ? 'Hoy' : DIAS[d]}
          </button>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Tipo de clase">
        {TIPOS.map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={t === tipo}
            onClick={() => setTipo(t)}
            className={cn('min-h-[40px] rounded-full px-4 text-[0.95rem]', t === tipo ? 'bg-senal font-semibold text-grafito' : 'bg-hueso-2 text-grafito hover:bg-grafito/10')}
          >
            {t}
          </button>
        ))}
      </div>

      <ul className="mt-6 divide-y divide-grafito/10 border-y border-grafito/10" aria-live="polite">
        {clases.length === 0 && (
          <li className="py-6 text-gris">No hay clases de {tipo.toLowerCase()} este día. Prueba otro día o mira todas.</li>
        )}
        {clases.map((c) => {
          const enCurso = dia === hoy && c.hora <= minutos && minutos < c.hora + c.dura
          const pasada = dia === hoy && c.hora + c.dura <= minutos
          const esProxima = proxima === c && !enCurso
          const texto = `Hola CARGA, quiero reservar cupo en ${c.nombre} el ${dia === hoy ? 'día de hoy' : DIAS[dia].toLowerCase()} a las ${horaTexto(c.hora)}`
          return (
            <li key={`${c.hora}-${c.nombre}`} className={cn('grid grid-cols-[104px_1fr] items-center gap-x-4 gap-y-2 py-4 sm:grid-cols-[110px_1fr_auto]', pasada && 'text-gris [&_.text-gris]:text-gris')}>
              <span className="titular text-2xl whitespace-nowrap normal-case tabular-nums sm:text-3xl">{horaTexto(c.hora)}</span>
              <span>
                <span className="block text-lg font-semibold">
                  {c.nombre}
                  {enCurso && <span className="ml-2 align-middle text-sm font-semibold text-ok">En curso</span>}
                  {esProxima && <span className="ml-2 align-middle text-sm font-semibold text-grafito underline decoration-senal decoration-4 underline-offset-4">La próxima</span>}
                </span>
                <span className="block text-gris">{c.tipo} · {c.coach} · {c.dura} min · {c.cupos} cupos</span>
              </span>
              <span className="col-start-2 sm:col-start-auto">
                {pasada ? (
                  <span className="text-sm text-gris">Ya pasó</span>
                ) : (
                  <button type="button" className="boton boton--grafito min-h-[44px] px-4 text-[0.95rem]" onClick={() => abrirMensaje(texto)} aria-label={`Reservar cupo en ${c.nombre} a las ${horaTexto(c.hora)}`}>
                    Reservar cupo
                  </button>
                )}
              </span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
