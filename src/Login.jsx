import { useState } from 'react';

const Login = ({ client, setClient, setLogged, setChannel }) => {
  const [pass, setPass] = useState('')
  // El server da de alta a los usuarios
  // Si existe en el fichero, se conecta al socket con sus datos
  const handleLogin = () => {
    // tiene que hacer login con el servidor de express
    // 1. Post con los datos
    // 2. Comprobar que existe dentro del objeto JSON
    // 3. Acceder al canal que le corresponde al usuario

    fetch('http://localhost:8080/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user: client,
        pass: pass,
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log("Data recibido ", data);
        if (data.response === 'yes') {
          console.log("respuesta correcta")
          setLogged(true);
          setChannel(data.channel)
          setClient(data.name)
        } else {
          console.log("Login incorrecto")
        }
      });

    // setLogged(true)
    // console.log("se ha hecho login con cliente ", client)
    // setClient(client)
  }

  // Login utiliza los nombres que hay en el fichero y reenvia al canal concreto
  // por url

  return (
    <div>
      <h1>Login</h1>
      <label>
        {"Nombre: "}
        <input
          type="text"
          name="name"
          value={client}
          onChange={(e) => setClient(e.target.value)}
        />
      </label>
      <label>
        {"Pass: "}
        <input
          type="text"
          name="name"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
      </label>
      <button onClick={handleLogin}>Conectar</button>
    </div>
  )
}

export default Login
