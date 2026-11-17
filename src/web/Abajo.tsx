import { COACHES, GYM, HORARIO } from '@/datos'

export function Coaches() {
  return (
    <section id="coaches" className="bg-hueso-2 py-16 md:py-24" aria-labelledby="coaches-titulo">
      <div className="contenedor">
        <h2 id="coaches-titulo" className="titular text-5xl md:text-6xl">Quién te entrena</h2>
        <p className="mt-3 max-w-xl text-gris">Siempre hay un entrenador en la sala de pesas. Pregúntale lo que quieras: está para eso.</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {COACHES.map((c) => (
            <article key={c.nombre}>
              <img
                src={`/img/${c.foto}-640.webp`}
                width={640}
                height={480}
                loading="lazy"
                alt={`Clase de ${c.rol.toLowerCase()} en CARGA`}
                className="aspect-[4/3] w-full rounded-[var(--radius-tarjeta)] object-cover"
              />
              <h3 className="titular mt-4 text-3xl">{c.nombre}</h3>
              <p className="font-semibold">{c.rol}</p>
              <p className="mt-1 text-gris">{c.texto}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

const PREGUNTAS = [
  { p: '¿Cómo es la clase de prueba?', r: 'Nos escribes por WhatsApp, eliges la clase y vienes. Es gratis, una vez por persona. Te recibimos 10 minutos antes para mostrarte el gimnasio.' },
  { p: '¿Qué tengo que llevar?', r: 'Ropa cómoda, zapatos deportivos, toalla y agua. Para boxeo prestamos guantes, pero si tienes vendas, mejor.' },
  { p: '¿Hay estacionamiento?', r: 'Sí, en el sótano del edificio y es gratis mientras entrenas. También estamos a 5 cuadras del metro Altamira.' },
  { p: '¿Puedo congelar el plan?', r: 'Sí, hasta 15 días al mes si viajas o te enfermas. Solo avísanos por WhatsApp antes.' },
  { p: '¿Abren en feriados?', r: 'Sí, con horario de domingo (8:00 a. m. a 1:00 p. m.). Lo avisamos en Instagram unos días antes.' },
  { p: '¿Nunca he ido a un gimnasio, puedo empezar?', r: 'Claro. Empiezas con una evaluación y una rutina de primera semana. El plan Con entrenador es el más cómodo para arrancar.' },
]

export function Preguntas() {
  return (
    <section id="preguntas" className="contenedor grid gap-8 py-16 md:py-24 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16" aria-labelledby="preguntas-titulo">
      <h2 id="preguntas-titulo" className="titular text-5xl md:text-6xl">Lo que más preguntan</h2>
      <div className="border-t border-grafito">
        {PREGUNTAS.map((x) => (
          <details key={x.p} className="group border-b border-grafito/15">
            <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-6 py-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
              {x.p}
              <span aria-hidden="true" className="titular text-3xl leading-none transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="max-w-2xl pb-5 text-gris">{x.r}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

export function Ubicacion() {
  return (
    <section id="ubicacion" className="bg-grafito py-16 text-hueso md:py-24" aria-labelledby="ubicacion-titulo">
      <div className="contenedor grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 id="ubicacion-titulo" className="titular text-5xl md:text-6xl">Dónde estamos</h2>
          <p className="mt-4 text-lg">{GYM.direccion}</p>
          <p className="mt-1 text-hueso/75">Estacionamiento gratis en el sótano · 5 cuadras del metro Altamira</p>
          <table className="mt-8 w-full max-w-md text-left">
            <caption className="solo-lector">Horario del gimnasio</caption>
            <tbody>
              {HORARIO.map((h) => (
                <tr key={h.dias} className="border-b border-hueso/15">
                  <th scope="row" className="py-3 pr-6 font-semibold">{h.dias}</th>
                  <td className="py-3 text-hueso/80">{h.horas}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <a className="boton boton--senal mt-8" href={GYM.como_llegar} target="_blank" rel="noopener">Cómo llegar</a>
        </div>
        <iframe
          title="Mapa de la ubicación de CARGA en Los Palos Grandes"
          src="https://www.openstreetmap.org/export/embed.html?bbox=-66.8501%2C10.4965%2C-66.8399%2C10.5029&layer=mapnik&marker=10.4997%2C-66.8450"
          loading="lazy"
          className="aspect-[4/3] w-full rounded-[var(--radius-tarjeta)] lg:aspect-auto lg:h-full lg:min-h-[420px]"
        />
      </div>
    </section>
  )
}

export function Pie() {
  return (
    <footer className="bg-grafito-2 text-hueso">
      <div className="contenedor grid gap-6 py-10 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="titular text-4xl">CARGA</p>
          <p className="mt-3 max-w-xl text-hueso/75">
            <strong className="text-hueso">Proyecto de muestra.</strong> CARGA es un gimnasio ficticio hecho por{' '}
            <a className="underline underline-offset-2" href="https://josias-palmares.vercel.app" target="_blank" rel="noopener">Josías Palmares</a>{' '}
            para su portafolio. Nombres, precios, horarios y dirección son de ejemplo.
          </p>
          <p className="mt-2 text-sm text-hueso/65">
            Fotos: <a className="underline" href="https://www.pexels.com" target="_blank" rel="noopener">Pexels</a> · Mapa: <a className="underline" href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> · Tasa: <a className="underline" href="https://ve.dolarapi.com" target="_blank" rel="noopener">DolarApi</a>
          </p>
        </div>
        <a className="underline-offset-4 hover:underline" href="/privacidad.html">Privacidad</a>
      </div>
    </footer>
  )
}
