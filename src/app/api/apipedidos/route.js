const pedido = require('../../models');


import { NextResponse } from 'next/server';
export  async function GET() {
  try {
    const data = await pedido.find();
    return NextResponse.json(data)
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error al obtener los pedidos' });
  }
}


export async function POST(request) {
  try {
    const { nombre_usuario, productos, estado } =  await request.json();
    // Validación de datos
    if (!nombre_usuario || !productos || !estado) {
     
      return NextResponse.json({ message: `Campos obligatorios faltantes, esta es la informacion ${nombre_usuario}
      , ${productos} , ${estado}
      `, });
     

    }

    // Asegúrate de que productos sea un array que cumple con el esquema de producto
    const productosValidos = productos.map(producto => ({
      nombre: producto.nombre,
      precio_venta: producto.precio_venta,
      cantidad_venta: producto.cantidad_venta,
      fecha_vencimiento: new Date(producto.fecha_vencimiento),
      color: producto.color,
      talla: producto.talla,
    }));

    const nuevoPedido =  pedido({
      nombre_usuario,
      productos: productosValidos,
      estado,
    });

    const resultado = await nuevoPedido.save();

    return NextResponse.json(resultado);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error al procesar la solicitud' }, );
  }
}








export async function PUT(request) {
  try {
    // Extrae los datos del cuerpo de la solicitud
    const { id, nombre_usuario, productos, estado } = await request.json();

    // Validación de datos
    if (!id || !nombre_usuario || !productos || !estado) {
      return NextResponse.json({
        message: `Campos obligatorios faltantes: id=${id}, nombre_usuario=${nombre_usuario}, productos=${productos}, estado=${estado}`,
      });
    }

    // Asegúrate de que productos sea un array que cumple con el esquema de producto
    const productosValidos = productos.map(producto => ({
      nombre: producto.nombre,
      precio_venta: producto.precio_venta,
      cantidad_venta: producto.cantidad_venta,
      fecha_vencimiento: new Date(producto.fecha_vencimiento),
      color: producto.color,
      talla: producto.talla,
    }));

    // Encuentra y actualiza el pedido existente
    const pedidoExistente = await pedido.findByIdAndUpdate(
      id,
      {
        nombre_usuario,
        productos: productosValidos,
        estado,
      },
      { new: true } // Devuelve el documento actualizado
    );
    // Verifica si el pedido existe
    if (!pedidoExistente) {
      return NextResponse.json({ message: 'Pedido no encontrado' });
    }
    // Devuelve la respuesta con el pedido actualizado
    return NextResponse.json(pedidoExistente);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error al procesar la solicitud' });
  }
}

export async function DELETE(request) {
  try {
    const { id } =  await request.json();

    // Validación de datos
    if (!id) {
      return NextResponse.json({ message: 'El campo "id" es obligatorio.' + id});
    }

    // Buscar el pedido por su ID y eliminarlo
    const resultado = await pedido.findByIdAndDelete(id);

    if (!resultado) {
      return NextResponse.json({ message: 'Pedido no encontrado.' });
    }

    return NextResponse.json({ message: 'Pedido eliminado correctamente.' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error al procesar la solicitud.' });
  }
}


  





