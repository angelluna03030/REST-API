import { NextResponse } from "next/server";

export async function POST() {
  try {

    const esValido = true;

    if (esValido) {
  

      return NextResponse.json({ message: 'Validación exitosa' });
    } else {
      // Importante: Asegúrate de agregar una declaración 'return' aquí
      return NextResponse.json({ message: 'La validación ha fallado' });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error al procesar la solicitud' });
  }
}