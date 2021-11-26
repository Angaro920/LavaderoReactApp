import React from 'react'

const FormRegistro = () => {
    return (
        <div> <section class="registro">
        <form action="">
            <h5>Formulario de Registro</h5>
            <div class="form-group my-3">
                <label htmlFor="">Nombre:</label>
                <input type="text" name="usuario" placeholder="Digite su nombre"/>
            </div>
            <div class="form-group my-3">
                <label htmlFor="">Correo:</label>
                <input type="email" name="correo" id="" placeholder="Digite su correo"/>
            </div>
            <div class="form-group my-3">
                <label htmlFor="">Contraseña:</label>
                <input type="password" name="contraseña" value="" placeholder="Contraseña"/>
            </div>
            <input type="submit" name="" value="Ingresar"/>
        </form>        
    </section></div>
    )
}

export default FormRegistro