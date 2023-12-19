const registros = require('../../modelssecion');
import { NextResponse } from 'next/server';

export async function POST(request) {
   
  try {
    const { Correo, constrena } = await request.json();
    const usuarioEncontrado = await registros.findOne({Correo: Correo, constrena: constrena });
    if (usuarioEncontrado === null) {
        // Usuario no encontrado o credenciales incorrectas, devuelve un mensaje genérico
        return NextResponse.json(false)
        
      } else {
      
        return NextResponse.json(true) ;
      }
      
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: 'Error al procesar la solicitud',
    });
  }
  
}



