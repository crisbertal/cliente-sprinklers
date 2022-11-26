import { useState } from 'react';

const Login = ({ client, setClient, setLogged, setChannel }) => {
  const [pass, setPass] = useState('')

  const handleDefault = () => {
    setClient("Laura");
    setPass("1234");
  }

  const handleLogin = () => {
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
  }

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
      <button onClick={handleDefault}>Default</button>
    </div>
  )
}

export default Login
