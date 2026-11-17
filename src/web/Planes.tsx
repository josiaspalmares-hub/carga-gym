import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { EXTRAS, PLANES, wa, type Plan } from '@/datos'
import { bolivares, dolares, type EstadoTasa } from '@/lib/moneda'
import { cn } from '@/lib/utils'

function Bs({ monto, tasa, claro }: { monto: number; tasa: EstadoTasa; claro?: boolean }) {
  return (
    <span className={cn('block text-sm tabular-nums whitespace-nowrap', claro ? 'text-hueso/70' : 'text-gris')}>
      {tasa.tasa ? bolivares(monto, tasa.tasa) : tasa.fallo ? 'Bs a la tasa BCV' : '…'}
    </span>
  )
}

// ¿Qué plan te conviene? Tres preguntas y una recomendación
const PREGUNTAS = [
  { id: 'dias', texto: '¿Cuántos días a la semana vas a venir?', opciones: [['pocos', '1 a 2 días'], ['varios', '3 a 4 días'], ['casi', '5 o más']] },
  { id: 'como', texto: '¿Cómo prefieres entrenar?', opciones: [['solo', 'Por mi cuenta'], ['grupo', 'En clases'], ['guiado', 'Con alguien que me guíe']] },
  { id: 'sabe', texto: '¿Ya sabes usar las pesas?', opciones: [['si', 'Sí'], ['algo', 'Más o menos'], ['no', 'Nada']] },
] as const

type Respuestas = Partial<Record<(typeof PREGUNTAS)[number]['id'], string>>

function recomendar(r: Respuestas): { plan: Plan; porque: string } {
  const plan = (id: string) => PLANES.find((p) => p.id === id)!
  if (r.dias === 'pocos') return { plan: { ...plan('libre'), nombre: 'Pase de un día', precio: 4, periodo: 'cada vez' }, porque: 'Si vienes 1 o 2 días, te sale más barato pagar cada visita ($4) que el mes.' }
  if (r.como === 'guiado' || r.sabe === 'no') return { plan: plan('coach'), porque: 'Para empezar sin lesionarte conviene que un entrenador te arme el plan y te corrija la técnica.' }
  if (r.como === 'grupo') return { plan: plan('clases'), porque: 'Te gusta entrenar acompañado: con este plan entras a todas las clases.' }
  return { plan: plan('libre'), porque: 'Ya sabes entrenar y prefieres ir a tu ritmo: no necesitas pagar clases.' }
}

export function QuePlan({ tasa }: { tasa: EstadoTasa }) {
  const [r, setR] = useState<Respuestas>({})
  const reducir = useReducedMotion()
  const listo = PREGUNTAS.every((p) => r[p.id])
  const resultado = listo ? recomendar(r) : null

  return (
    <section id="que-plan" className="bg-grafito py-16 text-hueso md:py-24" aria-labelledby="que-plan-titulo">
      <div className="contenedor grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
        <div>
          <h2 id="que-plan-titulo" className="titular text-5xl md:text-6xl">¿Qué plan te conviene?</h2>
          <p className="mt-3 max-w-md text-hueso/80">Tres preguntas y te decimos cuál pagar. Sin registrarte.</p>
          <div className="mt-8 grid gap-7">
            {PREGUNTAS.map((p) => (
              <fieldset key={p.id} className="min-w-0">
                <legend className="mb-3 text-lg font-semibold">{p.texto}</legend>
                <div className="flex flex-wrap gap-2">
                  {p.opciones.map(([valor, etiqueta]) => (
                    <label key={valor} className={cn('relative min-h-[46px] cursor-pointer content-center rounded-[var(--radius-campo)] border px-4 has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-senal', r[p.id] === valor ? 'border-senal bg-senal font-semibold text-grafito' : 'border-hueso/25 hover:border-hueso/60')}>
                      <input type="radio" name={p.id} value={valor} checked={r[p.id] === valor} onChange={() => setR((x) => ({ ...x, [p.id]: valor }))} className="sr-only" />
                      {etiqueta}
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>
        </div>

        <div aria-live="polite" className="lg:pt-14">
          <AnimatePresence mode="wait" initial={false}>
            {resultado ? (
              <motion.div
                key={resultado.plan.nombre}
                initial={reducir ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducir ? undefined : { opacity: 0 }}
                className="rounded-[var(--radius-tarjeta)] bg-hueso p-6 text-grafito md:p-8"
              >
                <p className="text-sm font-semibold text-gris">Te conviene</p>
                <p className="titular mt-1 text-5xl">{resultado.plan.nombre}</p>
                <p className="titular mt-3 text-4xl">{dolares(resultado.plan.precio)} <span className="font-sans text-base font-normal normal-case text-gris">{resultado.plan.periodo}</span></p>
                <Bs monto={resultado.plan.precio} tasa={tasa} />
                <p className="mt-4 text-lg">{resultado.porque}</p>
                <a className="boton boton--grafito mt-6" href={wa(`Hola CARGA, me interesa el plan ${resultado.plan.nombre}. ¿Puedo ir a una clase de prueba?`)} target="_blank" rel="noopener">
                  Quiero este plan
                </a>
              </motion.div>
            ) : (
              <motion.p key="vacio" className="rounded-[var(--radius-tarjeta)] border border-dashed border-hueso/25 p-6 text-hueso/75 md:p-8">
                Responde las {PREGUNTAS.length} preguntas y aquí aparece el plan que te conviene, con el precio en $ y Bs.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export function Planes({ tasa }: { tasa: EstadoTasa }) {
  return (
    <section id="planes" className="contenedor py-16 md:py-24" aria-labelledby="planes-titulo">
      <h2 id="planes-titulo" className="titular text-5xl md:text-6xl">Planes y precios</h2>
      <p className="mt-3 max-w-xl text-gris">Sin inscripción. En bolívares a la tasa del BCV del día. Pago móvil, Zelle, Binance o efectivo.</p>
      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {PLANES.map((p) => (
          <article key={p.id} className={cn('flex flex-col rounded-[var(--radius-tarjeta)] p-6 md:p-7', p.destacado ? 'bg-grafito text-hueso' : 'border border-grafito/15 bg-hueso')}>
            {p.destacado && <p className="text-sm font-semibold text-senal">El que más eligen: incluye boxeo y todas las clases</p>}
            <h3 className="titular mt-1 text-4xl">{p.nombre}</h3>
            <p className={cn('mt-1', p.destacado ? 'text-hueso/80' : 'text-gris')}>{p.para}</p>
            <p className="titular mt-5 text-6xl">{dolares(p.precio)} <span className={cn('font-sans text-base font-normal normal-case', p.destacado ? 'text-hueso/70' : 'text-gris')}>{p.periodo}</span></p>
            <Bs monto={p.precio} tasa={tasa} claro={p.destacado} />
            <ul className="mt-6 grid gap-2">
              {p.incluye.map((x) => (
                <li key={x} className="flex gap-3"><span aria-hidden="true" className={p.destacado ? 'text-senal' : 'text-grafito'}>—</span>{x}</li>
              ))}
            </ul>
            <a className={cn('boton mt-8', p.destacado ? 'boton--senal' : 'boton--grafito')} href={wa(`Hola CARGA, quiero el plan ${p.nombre}.`)} target="_blank" rel="noopener">
              Elegir {p.nombre}
            </a>
          </article>
        ))}
      </div>
      <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-gris">
        {EXTRAS.map((e) => <li key={e.nombre}><span className="font-semibold text-grafito">{e.nombre}:</span> {dolares(e.precio)}</li>)}
      </ul>
    </section>
  )
}

