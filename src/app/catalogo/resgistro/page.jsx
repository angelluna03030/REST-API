"use client"
import { useState } from "react";
import Image from 'next/image';
import Link from "next/link";
const Registro = () => {


  const [nombre, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [Correo, setCorreo] = useState('');
  const [numero, setCelular] = useState('');
  const [constrena, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [mensajeCelular, setMensajeCelular] = useState('');
  const [claseDeEstilo, setClaseDeEstilo] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const validatePasswords = () => {
    if (constrena !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden');
    } else {
      setErrorMessage('');
    }
  };

  const validarNumero = () => {
    if (numero.length !== 10) {
      setClaseDeEstilo('Error');
      return 'El número de celular debe tener 10 dígitos';
    } else {
      setClaseDeEstilo('');
      return '';
    }
  };

  const handleSubmit = async (event) => {

    validatePasswords();
    const mensajeCelular = validarNumero();
    setMensajeCelular(mensajeCelular);
  
    // Utiliza el callback para asegurar la actualización del estado
  
  
  
    setErrorMessage((prevErrorMessage) => {
      return prevErrorMessage || mensajeCelular;
    });
 
    const estaAutenticado = await handleLogin(nombre, apellidos, Correo, constrena, numero);
if (!estaAutenticado) {
  setModalOpen(true)
} else {
  setClaseDeEstilo('Error');
}

  };
  const handleLogin = async (nombre, apellidos, Correo, constrena, numero) => {
    try {
        const response = await fetch('/api/apipost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre, apellidos, Correo, constrena, numero }),
        });

        const data = await response.json();
        console.log(data);
        return false;
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        return false;
    }
};


  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="card">
          <div className="card-texto">
          {isModalOpen && (
  <div className="modal-overlay">
    <div className="modal-content">
      <p>Se registro correctamente</p>
    
      <button onClick={() => setModalOpen(false)}>Cerrar</button>
    </div>
  </div>
)}
            <h2>Registrarse</h2>
            <div className={`input ${claseDeEstilo}`}>
              <div className="nombre">
                <input
                  type="text"
                  value={nombre}
                  placeholder="Nombre"
                  required
                  onChange={(e) => setNombres(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Apellidos"
                  required
                  value={apellidos}
                  onChange={(e) => setApellidos(e.target.value)}
                />
              </div>
              <div className="Registro">
                <input
                  type="email"
                  required
                  placeholder="Correo"
                  value={Correo}
                  onChange={(e) => setCorreo(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Celular"
                  value={numero}
                  required
                  onChange={(e) => setCelular(e.target.value)}
                />
                <p>{mensajeCelular}</p>
                <input
                  type="password"
                  value={constrena}
                  required
                  placeholder="Nueva contraseña"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  type="password"
                  value={confirmPassword}
                  required
                  placeholder="Confirmar contraseña"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <p>{errorMessage}</p>
              </div>
            </div>
            <div className="texto-registro">
              <a className="areglar">
                Aceptar términos y condiciones de uso
                <input type="checkbox" required className="ui-checkbox" />
              </a>
            </div>
            <div className="descripcion">
              <Link href="/">Ya tengo una cuenta</Link>
            </div>
            <div className="btn">
              <button type="submit">Registro</button>
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

export default Registro;
