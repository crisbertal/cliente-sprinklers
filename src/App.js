import { useState } from "react";

import Player from "./Player.jsx";
import Login from "./Login.jsx";

const App = () => {
  const [counter, setCounter] = useState(0);
  const [client, setClient] = useState("");
  const [channel, setChannel] = useState("");
  const [isLogged, setLogged] = useState(false);

  return (
    <div>
      <h1>Juego</h1>
      {/* Si no esta conectado muestra login. Con conexion muestra el Player */}
      {
        !isLogged ?
          <Login
            client={client}
            setClient={setClient}
            setLogged={setLogged}
            setChannel={setChannel}
          /> :
          <Player
            client={client}
            counter={counter}
            channel={channel}
            setCounter={setCounter}
          />
      }
    </div>
  )
}

export default App;

