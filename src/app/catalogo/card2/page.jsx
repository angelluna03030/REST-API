"use client"
import Link from "next/link";
import "./card.css"
import Image from "next/image"



const Desktop = () => {
  // Estado para la talla seleccionada

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const requestBody = {
      nombre_usuario: "angel luna",
      productos: [
        {
          nombre: "Camisa Roja con corazones",
          precio_venta: 100000,
          cantidad_venta: 1,
          fecha_vencimiento: "2023-11-28T00:00:00.000Z",
          color: "Roja",
          talla: "S",
        }
      ],
      estado: "Activo",
      fecha_pedido: new Date().toISOString(),
    };

    try {
      const response = await fetch('/api/apipedidos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        alert('Pedido enviado con éxito');
        // Puedes agregar más lógica aquí, por ejemplo, mostrar un mensaje al usuario.
      } else {
        console.error('Error al enviar el pedido');
        // Puedes manejar errores aquí, por ejemplo, mostrar un mensaje de error al usuario.
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };
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
      <form    onSubmit={handleFormSubmit}>
      <div className="card2">
        <div className="card-texto2">
          <h2>Camisa Roja con corazones</h2>
    
          
            
         
          <div className="description2">
          <br/>
          $100000
          <br/>
          <p >Roja</p>

                   </div>
          <p>Selecciona la talla de tu mascota</p>
          <div className="radio-inputs2">
            <label className="radio2">
              <input type="radio" name="radio" checked={true} />
              <span className="name2">S</span>
            </label>
            <label className="radio2">
              <input type="radio" name="radio" />
              <span className="name2">M</span>
            </label>
    
            <label className="radio2">
              <input type="radio" name="radio" />
              <span className="name2">L</span>
            </label>
    
            <label className="radio2">
              <input type="radio" name="radio" />
              <span className="name2">XL</span>
            </label>
    
            <label className="radio2">
              <input type="radio" name="radio" />
              <span className="name2">XXL</span>
            </label>
          </div>
          <p>
            <a className="">¿No sabes cómo? Aquí te mostramos</a>
            <div className="card-button2">
  <button type="submit">
    <p>añadir al carrito</p>
  </button>
  <svg className="svg-icon2" viewBox="0 0 20 20">
    <path d="M17.72,5.011H8.026c-0.271,0-0.49,0.219-0.49,0.489c0,0.271,0.219,0.489,0.49,0.489h8.962l-1.979,4.773H6.763L4.935,5.343C4.926,5.316,4.897,5.309,4.884,5.286c-0.011-0.024,0-0.051-0.017-0.074C4.833,5.166,4.025,4.081,2.33,3.908C2.068,3.883,1.822,4.075,1.795,4.344C1.767,4.612,1.962,4.853,2.231,4.88c1.143,0.118,1.703,0.738,1.808,0.866l1.91,5.661c0.066,0.199,0.252,0.333,0.463,0.333h8.924c0.116,0,0.22-0.053,0.308-0.128c0.027-0.023,0.042-0.048,0.063-0.076c0.026-0.034,0.063-0.058,0.08-0.099l2.384-5.75c0.062-0.151,0.046-0.323-0.045-0.458C18.036,5.092,17.883,5.011,17.72,5.011z"></path>
    <path d="M8.251,12.386c-1.023,0-1.856,0.834-1.856,1.856s0.833,1.853,1.856,1.853c1.021,0,1.853-0.83,1.853-1.853S9.273,12.386,8.251,12.386z M8.251,15.116c-0.484,0-0.877-0.393-0.877-0.874c0-0.484,0.394-0.878,0.877-0.878c0.482,0,0.875,0.394,0.875,0.878C9.126,14.724,8.733,15.116,8.251,15.116z"></path>
    <path d="M13.972,12.386c-1.022,0-1.855,0.834-1.855,1.856s0.833,1.853,1.855,1.853s1.854-0.83,1.854-1.853S14.994,12.386,13.972,12.386z M13.972,15.116c-0.484,0-0.878-0.393-0.878-0.874c0-0.484,0.394-0.878,0.878-0.878c0.482,0,0.875,0.394,0.875,0.878C14.847,14.724,14.454,15.116,13.972,15.116z"></path>
  </svg>
</div>
        </p>
      </div>
  
      <div className="card-img2">
      <Image
            src={"https://hips.hearstapps.com/hmg-prod/images/7588089100-1-1-1-1654068357.jpg?crop=1.00xw:0.304xh;0,0.332xh&resize=1200:*"}
            alt={`Imagen de camisa roja`}
            width={500}
            height={500}
          />
      </div>
    </div>
  </form>
 
 </> );
  };
  
  export default Desktop;
  