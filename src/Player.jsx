import { useEffect } from 'react';

const Player = ({ client, counter, setCounter, channel }) => {
  // se conecta al canal especificado
  const URL = `ws://localhost:8080/${channel}`;
  // REFACTOR de momento no peta creando el WebSocket fuera
  const ws = new WebSocket(URL);

  const handleIncrease = () => {
    ws.send(JSON.stringify({
      type: "Increase",
      sender: client,
      body: counter,
    }));
  }

  useEffect(() => {
    // Abre el WebSocket y envia el nombre de usuario
    ws.onopen = () => {
      console.log('WebSocket Connected');
      // indica al server que es una nueva conexion junto con el username
      ws.send(JSON.stringify({
        type: "Connection",
        body: client,
      }))
    }

    // cuando recibe del server
    ws.onmessage = (e) => {
      // recibe del server el incremento del jugador
      // actualiza al contador enviado por otro jugador
      const data = JSON.parse(e.data)
      console.log("El recibo", data)
      setCounter(data.body)
    }

    return () => {
      ws.onclose = () => {
        console.log('WebSocket Disconnected');
      }
    }
  }, []);

  return (
    <div>
      <h2>{counter}</h2>
      <h3>Con cliente {client} en el canal {channel}</h3>
      <button onClick={handleIncrease}>Incrementa</button>
    </div>
  )
}

export default Player;
