// Datos del gimnasio (ficticio, para el portafolio)

export const GYM = {
  nombre: 'CARGA',
  direccion: '2da transversal de Los Palos Grandes, Edif. Mirador, PB, Caracas',
  como_llegar: 'https://www.google.com/maps/search/?api=1&query=Los+Palos+Grandes+Caracas',
}

export const HORARIO = [
  { dias: 'Lunes a viernes', horas: '5:30 a. m. – 10:00 p. m.' },
  { dias: 'Sábado', horas: '7:00 a. m. – 6:00 p. m.' },
  { dias: 'Domingo', horas: '8:00 a. m. – 1:00 p. m.' },
]

export const AREAS = [
  { id: 'pesas', nombre: 'Pesas y máquinas', texto: 'Racks, mancuernas hasta 50 kg y máquinas guiadas para empezar seguro.', foto: 'pesas' },
  { id: 'clases', nombre: 'Salón de clases', texto: '120 m² con piso de goma, espejos y aire acondicionado.', foto: 'clases' },
  { id: 'boxeo', nombre: 'Boxeo', texto: 'Sacos, guantes para prestar y un ring pequeño para técnica.', foto: 'boxeo' },
  { id: 'cardio', nombre: 'Cardio', texto: '14 caminadoras, bicicletas y elípticas frente a la ventana.', foto: 'cardio' },
]

export type Tipo = 'Fuerza' | 'Cardio' | 'Boxeo' | 'Movilidad'
export type Clase = { hora: number; nombre: string; tipo: Tipo; coach: string; dura: number; cupos: number }

// Clases por día (0 = domingo … 6 = sábado). hora en minutos desde medianoche
const base: Clase[] = [
  { hora: 6 * 60, nombre: 'Fuerza total', tipo: 'Fuerza', coach: 'Andrés', dura: 50, cupos: 16 },
  { hora: 7 * 60, nombre: 'Cardio HIIT', tipo: 'Cardio', coach: 'Luis', dura: 45, cupos: 20 },
  { hora: 9 * 60, nombre: 'Movilidad', tipo: 'Movilidad', coach: 'Sofía', dura: 50, cupos: 14 },
  { hora: 12 * 60 + 15, nombre: 'Express 30', tipo: 'Cardio', coach: 'Luis', dura: 30, cupos: 20 },
  { hora: 17 * 60 + 30, nombre: 'Boxeo técnico', tipo: 'Boxeo', coach: 'Daniel', dura: 60, cupos: 12 },
  { hora: 18 * 60 + 30, nombre: 'Fuerza total', tipo: 'Fuerza', coach: 'Andrés', dura: 50, cupos: 16 },
  { hora: 19 * 60 + 30, nombre: 'Cardio HIIT', tipo: 'Cardio', coach: 'Luis', dura: 45, cupos: 20 },
]
const variante: Clase[] = [
  { hora: 6 * 60, nombre: 'Cardio HIIT', tipo: 'Cardio', coach: 'Luis', dura: 45, cupos: 20 },
  { hora: 7 * 60, nombre: 'Fuerza piernas', tipo: 'Fuerza', coach: 'Andrés', dura: 50, cupos: 16 },
  { hora: 10 * 60, nombre: 'Boxeo para empezar', tipo: 'Boxeo', coach: 'Daniel', dura: 50, cupos: 12 },
  { hora: 12 * 60 + 15, nombre: 'Movilidad', tipo: 'Movilidad', coach: 'Sofía', dura: 40, cupos: 14 },
  { hora: 17 * 60 + 30, nombre: 'Fuerza tren superior', tipo: 'Fuerza', coach: 'Andrés', dura: 50, cupos: 16 },
  { hora: 18 * 60 + 30, nombre: 'Boxeo técnico', tipo: 'Boxeo', coach: 'Daniel', dura: 60, cupos: 12 },
  { hora: 19 * 60 + 30, nombre: 'Movilidad', tipo: 'Movilidad', coach: 'Sofía', dura: 40, cupos: 14 },
]
export const CLASES: Record<number, Clase[]> = {
  0: [
    { hora: 9 * 60, nombre: 'Cardio en grupo', tipo: 'Cardio', coach: 'Luis', dura: 50, cupos: 24 },
    { hora: 10 * 60 + 30, nombre: 'Movilidad', tipo: 'Movilidad', coach: 'Sofía', dura: 50, cupos: 14 },
  ],
  1: base, 2: variante, 3: base, 4: variante, 5: base,
  6: [
    { hora: 8 * 60, nombre: 'Fuerza total', tipo: 'Fuerza', coach: 'Andrés', dura: 60, cupos: 18 },
    { hora: 9 * 60 + 30, nombre: 'Boxeo técnico', tipo: 'Boxeo', coach: 'Daniel', dura: 60, cupos: 12 },
    { hora: 11 * 60, nombre: 'Cardio en grupo', tipo: 'Cardio', coach: 'Luis', dura: 50, cupos: 24 },
  ],
}

export const DIAS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

export type Plan = { id: string; nombre: string; precio: number; periodo: string; para: string; incluye: string[]; destacado?: boolean }
export const PLANES: Plan[] = [
  { id: 'libre', nombre: 'Libre', precio: 25, periodo: 'al mes', para: 'Si ya sabes entrenar solo.', incluye: ['Pesas, máquinas y cardio', 'Todo el horario', 'Evaluación inicial'] },
  { id: 'clases', nombre: 'Clases', precio: 35, periodo: 'al mes', para: 'Si te motiva entrenar en grupo.', incluye: ['Todo lo del plan Libre', 'Clases ilimitadas (con reserva)', 'Boxeo incluido'], destacado: true },
  { id: 'coach', nombre: 'Con entrenador', precio: 70, periodo: 'al mes', para: 'Si quieres un plan hecho para ti.', incluye: ['Todo lo del plan Clases', '8 sesiones al mes con entrenador', 'Plan de entrenamiento y control cada mes'] },
]
export const EXTRAS = [
  { nombre: 'Pase de un día', precio: 4 },
  { nombre: 'Trimestral (plan Clases)', precio: 95 },
  { nombre: 'Pareja (2 planes Clases)', precio: 62 },
]

export const COACHES = [
  { nombre: 'Andrés', rol: 'Fuerza', texto: 'Te enseña la técnica antes de subir el peso. Lleva las clases de fuerza.', foto: 'pesas' },
  { nombre: 'Sofía', rol: 'Movilidad', texto: 'Clases para soltar espalda y caderas. Ideal si pasas el día sentado.', foto: 'clases' },
  { nombre: 'Daniel', rol: 'Boxeo', texto: 'Diez años en el ring. Sus clases para empezar no piden experiencia.', foto: 'boxeo' },
  { nombre: 'Luis', rol: 'Cardio y planes a medida', texto: 'Arma tu plan del mes y revisa tu avance contigo.', foto: 'plan-a-medida' },
]
