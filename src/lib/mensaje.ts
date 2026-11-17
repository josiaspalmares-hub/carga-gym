// Proyecto de muestra: en vez de abrir WhatsApp, muestra el mensaje que le llegaría al gimnasio
export const EVENTO_MENSAJE = 'carga:mensaje'

export function abrirMensaje(texto: string) {
  window.dispatchEvent(new CustomEvent<string>(EVENTO_MENSAJE, { detail: texto }))
}
