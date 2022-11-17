import { useState, useEffect } from "react";

const URL = 'ws://localhost:8080';
// REFACTOR de momento no peta creando el WebSocket fuera
const ws = new WebSocket(URL);

const App = () => {
  const [counter, setCounter] = useState(0);
  const [client, setClient] = useState("");

  const handleIncrease = () => {
    ws.send(JSON.stringify({
      sender: client,
      body: counter,
    }));
  }

  useEffect(() => {
    ws.onopen = () => {
      console.log('WebSocket Connected');
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
      <label>
        {"Nombre: "}
        <input
          type="text"
          name="name"
          value={client}
          onChange={(e) => setClient(e.target.value)}
        />
      </label>
      <h2>{counter}</h2>
      <button onClick={handleIncrease}>Incrementa</button>
    </div>
  )
}

export default App;

