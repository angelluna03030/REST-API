"use client"
import React, { useState,  } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Rutas from '../rutas';
import Image from 'next/image';
const Sesion = () => {
  const [claseDeEstilo, setClaseDeEstilo] = useState('');
  const [Correo, setCorreo] = useState('');
  const [constrena, setContrasena] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorContrasena, setErrorContrasena] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
const [modal2, setmodal2] = useState(false)
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const result = await handleLogin(Correo, constrena);

      if (result === true) {
        setModalOpen(true);
      
      } else {
        setClaseDeEstilo('Error');
        setmodal2(true)
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  const handleLogin = async (Correo, constrena) => {
    try {
      const response = await axios.post('/api/apisesion', {
        Correo,
        constrena,
      });
  
      return response.data;
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      throw error; // Considera manejar el error aquí o registrarlo
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
      {isModalOpen && (
  <div className="modal-overlay">
    <div className="modal-content">
      <p>ingreso exitoso</p>
      <Rutas>
      <button onClick={() => setModalOpen(false)}>entrar</button>
      </Rutas>
    </div>
  </div>
)}

{modal2 && (
  <div className="modal-overlay">
    <div className="modal-content">
      <p>Error El usuario y la contrseña no son validas</p>
    
      <button onClick={() => setmodal2(false)}>Cerrar</button>
    </div>
  </div>
)}
        <div className="card">
          <div className="card-texto">
            <h2>Iniciar sesión</h2>

            <div className={`input ${claseDeEstilo}`}>
              <input
                type="email"
                value={Correo}
                placeholder="Correo Electrónico"
                onChange={(e) => setCorreo(e.target.value)}
              />
              <p>{errorMessage}</p>
              <input
                type="password"
                placeholder="Contraseña"
                value={constrena}
                onChange={(e) => setContrasena(e.target.value)}
              />
              <p>{errorContrasena}</p>
            </div>

            <div className="texto">
              <a>
                Mantener contraseña
                <input type="checkbox" className="ui-checkbox" />
              </a>
              <br />
              <a href="">Recuperar contraseña</a>
            </div>
            <div className="descripcion">
              <Link href="catalogo/resgistro">Registrarse</Link>
            </div>
            <div className="btn">
              <button type="submit">Iniciar sesión</button>
            </div>
         
          </div>

          <div className="card-img">
          <Image
 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9RW0bfd_mK1cohLg5iL2ttDeWD6fK-ef-mg&usqp=CAU"
      alt="imagen de perros"
      width={500}
      height={300}
      layout="responsive"
    
    />
          </div>
        </div>
      </form>
    </>
  );
};

export default Sesion;
