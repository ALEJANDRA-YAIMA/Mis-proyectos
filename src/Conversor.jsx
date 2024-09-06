import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Conversor() {
  
  const [textoAvoz, setTextoAvoz] = useState('')
  const [vozATexto, setVozATexto] = useState('')
  

  function cambiartexto(evento) {
    setTextoAvoz(evento.target.value)
  }

  function convertirTextoAvoz() {
    const synth = window.speechSynthesis
    const utterThis = new SpeechSynthesisUtterance(textoAvoz);
    synth.speak(utterThis)
  }
  function resultado(event) {
    setVozATexto( event.results[0][0].transcript)
  }
  function grabarVozATexto() {
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'es-ES'
    recognition.start()
    recognition.onresult = resultado 
  }

    return(
      <>
      <h1>Conversor TTS Y STT</h1>
      <br /> 
   <h3>Conversor de texto a voz</h3>
    <input type="text"  id="textoAvoz" value={textoAvoz} onChange={cambiartexto}/>
    <button onClick={convertirTextoAvoz}>Convertir</button>

    <h3>Conversor de voz a texto</h3>
    <button onClick={ grabarVozATexto}>Grabar</button>
    {vozATexto}
      </>
    );
  }
  

export default Conversor