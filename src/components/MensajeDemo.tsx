import { useEffect, useRef, useState } from 'react'
import { EVENTO_MENSAJE } from '@/lib/mensaje'

export function MensajeDemo() {
  const dialogo = useRef<HTMLDialogElement>(null)
  const [texto, setTexto] = useState('')

  useEffect(() => {
    const abrir = (e: Event) => {
      setTexto((e as CustomEvent<string>).detail)
      dialogo.current?.showModal()
    }
    window.addEventListener(EVENTO_MENSAJE, abrir)
    return () => window.removeEventListener(EVENTO_MENSAJE, abrir)
  }, [])

  return (
    <dialog
      ref={dialogo}
      aria-labelledby="mensaje-titulo"
      onClick={(e) => { if (e.target === dialogo.current) dialogo.current?.close() }}
      className="m-auto w-[min(100%-32px,440px)] rounded-[var(--radius-tarjeta)] bg-hueso p-0 text-grafito backdrop:bg-grafito/70"
    >
      <div className="p-6">
        <h2 id="mensaje-titulo" className="titular text-3xl">Así le llegaría tu mensaje</h2>
        <p className="mt-2 text-gris">En la web real de un gimnasio, este botón abre su WhatsApp con el mensaje listo para enviar.</p>
        <p className="mt-5 rounded-[var(--radius-tarjeta)] rounded-tr-sm bg-[#d9f5c9] p-4 text-[1.02rem] leading-snug">{texto}</p>
        <p className="mt-5 text-sm text-gris">
          <strong className="text-grafito">CARGA es un proyecto de muestra</strong>: no se envía nada a nadie. ¿Quieres una web así para tu negocio?{' '}
          <a className="font-semibold underline underline-offset-2" href="https://josias-palmares.vercel.app/#contacto" target="_blank" rel="noopener">Habla con quien la hizo</a>.
        </p>
        <button type="button" onClick={() => dialogo.current?.close()} className="boton boton--grafito mt-6 w-full">Entendido</button>
      </div>
    </dialog>
  )
}
