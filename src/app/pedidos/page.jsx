"use client"
import Link from "next/link";
import { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import "./estilos.css";
import 'jspdf-autotable';
const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchTermNombre, setSearchTermNombre] = useState('');
const [searchTermFecha, setSearchTermFecha] = useState('');
  useEffect(() => {
    // Llamada al método GET para obtener la lista de pedidos
    const fetchData = async () => {
      const response = await fetch('/api/apipedidos');
      const data = await response.json();
      setPedidos(data);
    };

    fetchData();
  }, []);

  const handleEliminarPedido = async (id) => {
    setModalOpen(true)
    const response = await fetch('/api/apipedidos', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
      
    });

    if (response.ok) {
      // Actualizar la lista de pedidos después de la eliminación
      const updatedPedidos = pedidos.filter((pedido) => pedido._id !== id);
      setPedidos(updatedPedidos);
    }
  };

  const generatePDF = () => {
    // Crea una nueva instancia de jsPDF
    const pdf = new jsPDF();
  
    // Agrega encabezado
    const fechaReporte = new Date().toLocaleDateString(); // Obtén la fecha actual
    pdf.text('Itaron dog ', 20, 10);
    pdf.text(`Fecha del Reporte: ${fechaReporte}`, 20, 20);
  

    pdf.autoTable({ html: '#myTable', startY: 30 });
  
  
    const totalPagesExp = '0';
    pdf.setPage(1);
    pdf.text('correo: itarongdog@gmail.com ', 10, pdf.internal.pageSize.height - 12);
    pdf.text('Dirrecion itagui CLL 3-11b ', 10, pdf.internal.pageSize.height - 5);
    pdf.text('Página ' + pdf.internal.getCurrentPageInfo().pageNumber + '/' + totalPagesExp, pdf.internal.pageSize.width - 30, pdf.internal.pageSize.height - 10);
  
    
    pdf.save('reporte_pedidos.pdf');
  };
  const filteredPedidos = pedidos.filter((pedido) => {
    // Filtrar pedidos por el término de búsqueda en productos
    const productosText = pedido.productos
      ? pedido.productos.map((producto) => producto.nombre).join(' ').toLowerCase()
      : '';
  
    // Filtrar por nombre del pedido
    const nombrePedidoText = pedido.nombre ? pedido.nombre.toLowerCase() : '';
  
    // Filtrar por fecha del pedido
    const fechaPedidoText = pedido.fecha_pedido ? pedido.fecha_pedido.toLowerCase() : '';
  
    return (
      productosText.includes(searchTerm.toLowerCase()) &&
      nombrePedidoText.includes(searchTermNombre.toLowerCase()) &&
      fechaPedidoText.includes(searchTermFecha.toLowerCase())
    );
  });
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link href="/componestes">Catálogo</Link>
          </li>
          <li>
            <Link href="/pedidos">Pedidos</Link>
          </li>
        </ul>
      </nav>
      <div className="contenedor">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
  type="text"
  placeholder="Buscar por fecha del pedido..."
  value={searchTermFecha}
  onChange={(e) => setSearchTermFecha(e.target.value)}
/>
        <h1>Pedidos</h1>
        {isModalOpen && (
  <div className="modal-overlay">
    <div className="modal-content">
      <p>Se elimino el pedido</p>
    
      <button onClick={() => setModalOpen(false)}>Cerrar</button>
    </div>
  </div>
)}
        <table id="myTable">
          <thead>
            <tr>
              <th>Productos</th>
              <th>Estado</th>
              <th>Fecha del Pedido</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className="tabla">
            {filteredPedidos.map((pedido) => (
              <tr key={pedido._id}>
                <td>
                  {pedido.productos.map((producto) => (
                    <div key={producto._id} className="div">
                     producto: {producto.nombre}<br /> Cantidad: {producto.cantidad_venta}<br />
                      color: {producto.color}  <br />
                      color: {producto.talla}  <br />
                      precio: {producto.precio_venta}
                    </div>
                  ))}
                </td>
                <td className="no">{pedido.estado}</td>
                <td>{pedido.fecha_pedido}</td>
                <td>
                  <button onClick={() => handleEliminarPedido(pedido._id)} className="btn-shine">
                    <span>Eliminar</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>


        </table>
        <button onClick={generatePDF} className="btn-generate-pdf">
         Generar PDF
        </button>
      </div>
    </>
  );
};

export default Pedidos;
