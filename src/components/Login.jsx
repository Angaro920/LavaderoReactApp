import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from "axios"
import { portBackend } from "./portBackend"

const Login = () => {
    const history = useHistory();
    const [listCredentials, setListCredentials] = useState([])
    const [userData, setUserData] = useState({
        user: "",
        password: ""
    })

    useEffect(() => {
        getLoginCredentials()
    }, [])

    const getLoginCredentials = () => {
        axios.get("http://localhost:" + portBackend + "/api/User/all").then((response) => {
            setListCredentials(response.data)
        })
    }

    const verifyUser = () => {
        const { user, password } = userData
        if (listCredentials.some(({ name, pass }) => name === user && pass === password)) {
            window.alert("Inicio de sesion realizado correctamente");
            history.push("/registroAuto");
        } else {
            window.alert("No se encuentran las credenciales");

        }
    }

    return (
        <section className="registro">
            <form action="">
                <h5 className="form-title">Formulario Login</h5>
                <div className="form-group my-3">
                    <label htmlFor="">Usuario</label>
                    <input type="text" name="usuario" placeholder="Digite su nombre de usuario"
                        onChange={(event) => setUserData({ ...userData, user: event.target.value })} />
                </div>
                <div className="form-group my-3">
                    <label htmlFor="">Contraseña</label>
                    <input type="password" name="contraseña" placeholder="Digite su contraseña"
                        onChange={(event) => { setUserData({ ...userData, password: event.target.value }) }} />
                </div>
                <input type="submit" name="" value="Ingresar" onClick={verifyUser} />
            </form>
        </section>
    )
}

export default Login