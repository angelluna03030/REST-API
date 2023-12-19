const registros = require('../../modelssecion');
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { nombre, apellidos, Correo, constrena, numero } = await request.json();

        // Crear un nuevo documento en la base de datos
        const nuevoRegistro = await registros.create({
            nombre,
            apellidos,
            Correo,
            constrena,
            numero,
        });

        // Guardar los datos en un archivo JSON
        console.log(JSON.stringify(nuevoRegistro));

    
        return NextResponse.json(nuevoRegistro);
    } catch (error) {
        console.error(error);

        return NextResponse.json({
            message: 'Error al procesar la solicitud',
            constrena: request.query.constrena,
        });
    }
}



