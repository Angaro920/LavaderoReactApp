import React, { useState, useEffect } from 'react'
import axios from "axios"


const Login = () => {

    const[listIniciar,setListIniciar]=useState([])
    
    useEffect(()=>{
        getIniciar()
    },[])

    const getIniciar = () => {
        axios.get("http://localhost:8081/api/Produccion/all").then((response) => {
        setListIniciar(response.data)
    })
}

    return (
        <section className="registro">
            <form action="">
                <h5 className="form-title">Formulario Login</h5>
                <div className="form-group my-3">
                    <label htmlFor="">Usuario</label>
                    <input type="text" name="usuario" placeholder="Digite su nombre de usuario" />
                </div>
                <div className="form-group my-3">
                    <label htmlFor="">Contraseña</label>
                    <input type="password" name="contraseña" value="" placeholder="Digite su contraseña" />
                </div>
                <input type="submit" name="" value="Ingresar" />
                <p><a href="/html/FormRegistro.html">¿No tienes cuenta?Registrate</a> </p>
            </form>
        </section>
    )
}

export default Login