import { BlurFade } from '@/components/ui/blur-fade'
import { AREAS, CLASES, wa } from '@/datos'

const CLASES_SEMANA = Object.values(CLASES).reduce((n, dia) => n + dia.length, 0)

const PRUEBA = 'Hola CARGA, quiero agendar mi clase de prueba gratis.'

export function Portada() {
  return (
    <section className="relative isolate overflow-hidden bg-grafito text-hueso">
      <img
        src="/img/portada-1200.webp"
        srcSet="/img/portada-640.webp 640w, /img/portada-1200.webp 1200w"
        sizes="100vw"
        width={1200}
        height={800}
        alt=""
        fetchPriority="high"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-[60%_center] opacity-55"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-grafito via-grafito/70 to-grafito/20" aria-hidden="true" />
      <div className="contenedor flex min-h-[86svh] flex-col justify-end pt-28 pb-12 md:pb-16">
        <BlurFade delay={0.05}>
          <p className="font-semibold text-senal">Gimnasio en Los Palos Grandes · Abierto desde las 5:30 a. m.</p>
        </BlurFade>
        <BlurFade delay={0.12}>
          <h1 className="titular mt-3 max-w-4xl text-[3.4rem] sm:text-7xl lg:text-[7.5rem]">Entrena con un plan, no a ciegas.</h1>
        </BlurFade>
        <BlurFade delay={0.2}>
          <p className="mt-5 max-w-xl text-lg text-hueso/85">
            Pesas, clases y boxeo en un solo lugar, con entrenadores que te enseñan la técnica. Tu primera clase es gratis.
          </p>
        </BlurFade>
        <BlurFade delay={0.28}>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="boton boton--senal" href={wa(PRUEBA)} target="_blank" rel="noopener">Agendar clase de prueba gratis</a>
            <a className="boton boton--linea-clara" href="#horario">Ver el horario de hoy</a>
          </div>
        </BlurFade>
        <dl className="mt-10 grid max-w-2xl grid-cols-3 gap-4 border-t border-hueso/20 pt-5 text-sm sm:text-base">
          <div><dt className="text-hueso/70">Plan al mes desde</dt><dd className="titular text-3xl">$25</dd></div>
          <div><dt className="text-hueso/70">Clases por semana</dt><dd className="titular text-3xl">{CLASES_SEMANA}</dd></div>
          <div><dt className="text-hueso/70">Estacionamiento</dt><dd className="titular text-3xl">Gratis</dd></div>
        </dl>
      </div>
    </section>
  )
}

const RAZONES = [
  { titulo: 'Nadie te deja solo el primer día', texto: 'Evaluación, recorrido y una rutina para tu primera semana, incluidos en cualquier plan.' },
  { titulo: 'Clases desde las 6:00 a. m. hasta las 7:30 p. m.', texto: 'Antes del trabajo, al mediodía o al salir. Reservas tu cupo por WhatsApp.' },
  { titulo: 'Precio claro y sin inscripción', texto: 'Pagas el mes y ya. Puedes congelar el plan hasta 15 días si viajas o te enfermas.' },
]

export function Razones() {
  return (
    <section className="contenedor grid gap-10 py-16 md:grid-cols-[0.9fr_1.1fr] md:py-24" aria-labelledby="razones-titulo">
      <h2 id="razones-titulo" className="titular text-5xl md:text-6xl">Por qué la gente se queda</h2>
      <ol className="grid gap-8">
        {RAZONES.map((r, i) => (
          <li key={r.titulo} className="grid grid-cols-[56px_1fr] gap-4 border-t border-grafito/15 pt-6">
            <span className="titular text-4xl text-gris" aria-hidden="true">0{i + 1}</span>
            <span>
              <span className="block text-xl font-semibold">{r.titulo}</span>
              <span className="mt-1 block text-gris">{r.texto}</span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  )
}

export function Areas() {
  return (
    <section id="areas" className="bg-grafito py-16 text-hueso md:py-24" aria-labelledby="areas-titulo">
      <div className="contenedor">
        <h2 id="areas-titulo" className="titular text-5xl md:text-6xl">Cuatro zonas, un solo pase</h2>
        <p className="mt-4 max-w-xl text-hueso/80">Con cualquier plan usas todas las áreas. No hay que pagar aparte por boxeo ni por clases.</p>
      </div>
      <div className="contenedor mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {AREAS.map((a) => (
          <article key={a.id} className="group overflow-hidden rounded-[var(--radius-tarjeta)] bg-grafito-2">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src={`/img/${a.foto}-640.webp`}
                srcSet={`/img/${a.foto}-640.webp 640w, /img/${a.foto}-1200.webp 1200w`}
                sizes="(max-width: 639px) 92vw, (max-width: 1023px) 46vw, 23vw"
                width={640}
                height={800}
                loading="lazy"
                alt={a.nombre}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-5">
              <h3 className="titular text-3xl">{a.nombre}</h3>
              <p className="mt-2 text-hueso/80">{a.texto}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
