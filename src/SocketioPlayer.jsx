import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'

// si se inicializa aqui se ejecuta al iniciar la app
let socket = null;

const SocketioPlayer = () => {
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    // se asigna aqui dentro para que se ejecute solo al renderizar el componente
    socket = io('http://localhost:8080')

    socket.on('connect', () => console.log(socket.id))

    socket.on('connect_error', () => {
      setTimeout(() => socket.connect(), 5000)
    })

    // cuando se actualiza el contador
    socket.on('update', (data) => setCounter(data))

    socket.on('disconnect', () => console.log('Desconectado del socket'))
  }, [])

  const handleIncrease = () => {
    const newCounter = counter + 1
    setCounter(newCounter)
    // emite que se ha actualizado el contador actual
    socket.emit('changeCounter', newCounter)
  }

  const handleApi = () => {
    fetch('http://localhost:8080/api/data', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(data => {
        console.log("Data recibido ", data);
      });
  }

  return (
    <div>
      <h1>Cliente</h1>
      <h2>{counter}</h2>
      <button onClick={handleIncrease}>Incrementar</button>
      <button onClick={handleApi}>Llamar a la API</button>
    </div>
  )
}

export default SocketioPlayer;
