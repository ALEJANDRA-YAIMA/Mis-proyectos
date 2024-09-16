import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Conversor from './Conversor'

function App() {
  const [usuario, setUsuario] = useState('')
  const [clave, setClave] = useState('')
  const [logueado, setLogueado] = useState(false)
  const [usuarioRegistro, setUsuarioRegistro] = useState('')
  const [claveRegistro, setClaveRegistro] = useState('')
  const [usuarios, setUsuarios] = useState([])
  
  function cambiarusuario(evento) {
    setUsuario(evento.target.value) 
  }

  function cambiarclave(evento) {
    setClave(evento.target.value)
  }

  function cambiarusuarioRegistro(evento) {
    setUsuarioRegistro(evento.target.value) 
  }

  function cambiarclaveRegistro(evento) {
    setClaveRegistro(evento.target.value)
  }
   async function ingresar() {
    const peticion = await fetch('http://localhost:3000/login?usuario='+ usuario + ' &clave=' + clave )
    if (peticion.ok){
      setLogueado(true)
      obtenerUsuarios();
    }else{
      alert('Usuario o clave incorrecta')
      
    }
  }

  async function registrar() {
    const peticion = await fetch('http://localhost:3000/registro?usuario='+ usuarioRegistro + ' &clave=' + claveRegistro )
    if (peticion.ok){
      alert("usuario registrado")
      setLogueado(true)
      obtenerUsuarios();
    }else{
      alert('Usuario no registrado')
      
    }
  }
  
  async function validar() {
    const peticion = await fetch('http://localhost:3000/validar')
    if (peticion.ok) {
      setLogueado(true)

      obtenerUsuarios();
    }   
  }

  async function obtenerUsuarios() {
    const peticion = await fetch('http://localhost:3000/usuarios')
    if (peticion.ok) {
      const respuesta = await peticion.json()
      setUsuarios(respuesta)
      
    }   
  }

  useEffect(() => {
    validar()
  },[])
  
  if (logueado) {
    return (
      <>

    <Conversor/>

    

    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>Usuario</th>
          <th>Clave</th>
          <th>registro</th>
        </tr>
      </thead>
      <tbody>
        {
          usuarios.map(usuario => (
            <tr key={usuario.id}>
              <th>{usuario.usuario}</th>
              <th>{usuario.clave}</th>
            </tr>
          ))
        }
      </tbody>
    </table>


    </>)

  }
   
  return (
    <>
    <h1>Inicio de sesión</h1>
    <input placeholder='Usuario' type="text" name="usuario" id="usuario" value={usuario} onChange={cambiarusuario} /> 
    <input placeholder='Clave' type="password" name="clave" id="clave" value={clave} onChange={cambiarclave} />
    <button onClick={ingresar}>Ingresar</button>

    <h1>Registro</h1>
    <input placeholder='Usuario' type="text" name="usuario" id="usuario" value= {usuarioRegistro} onChange={cambiarusuarioRegistro} /> 
    <input placeholder='Clave' type="password" name="clave" id="clave" value= {claveRegistro} onChange={cambiarclaveRegistro} />
    <button onClick={ registrar}> Registrar</button>

    
    </>
    )
  }



export default App

