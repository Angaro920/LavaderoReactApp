import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import axios from "axios"

const RegistroAuto = () => {
    const [listFunctionaries, setListFunctionaries] = useState([])
    const [listServices, setListServices] = useState([])
    const [listVehicules, setListVehicules] = useState([])

    const [price, setPrice] = useState("")
    const [selections, setSelections] = useState({
        functionary: "",
        service: "",
        vehicule: "",
        date: "",
    })

    useEffect(() => {
        getFunctionaries()
        getServices()
        getVehicules()
    }, [])


    const getFunctionaries = () => {
        axios.get("http://localhost:8082/api/Funcionario/all").then((response) => {
            setListFunctionaries(response.data)
        })
    }

    const getServices = () => {
        axios.get("http://localhost:8082/api/Servicio/all").then((response) => {
            setListServices(response.data)
        })
    }

    const getVehicules = () => {
        axios.get("http://localhost:8082/api/Vehiculo/all").then((response) => {
            setListVehicules(response.data)
        })
    }

    const calculatePrice = () => {
        axios.get("http://localhost:8082/api/Servicio/" + selections.service).then((response) => {
            if (selections.vehicule == 1) {
                setPrice(response.data.price)
            } else if (selections.vehicule == 2) {
                setPrice(response.data.price + ((response.data.price * 10) / 100))
            }
        })
    }

    const registerData = () => {
        const payload = {
            funcionario: listFunctionaries.find(({ id }) => parseInt(id) === parseInt(selections.functionary)),
            servicio: listServices.find(({ id }) => parseInt(id) === parseInt(selections.service)),
            vehiculo: listVehicules.find(({ id }) => parseInt(id) === parseInt(selections.vehicule)),
            fecha: selections.date,
            totalPrice: parseInt(price)
        }
        axios.post("http://localhost:8082/api/Produccion/save", payload).then((response) => {
            window.alert("Registro ingresado correctamente");
        })
    }

    return (
        <div> <section className="registro">
            <form action="">
                <h4>Formulario registro de autos</h4>
                <div className="form-className my-3">
                    <label htmlFor="">Funcionario</label>
                    <select className="imput-form" id="funcionario"
                        onChange={(event) => setSelections({
                            ...selections,
                            functionary: event.target.value,
                        })}>
                        <option></option>
                        {
                            listFunctionaries && listFunctionaries.map((functionary) =>
                                <option value={functionary.id}>{functionary.name}</option>
                            )
                        }
                    </select>
                </div>
                <div className="form-className my-3">
                    <label htmlFor="">Servicio</label>
                    <select className="input-form" id="servicio"
                        onChange={(event) => setSelections({
                            ...selections,
                            service: event.target.value,
                        })}>
                        <option></option>
                        {
                            listServices && listServices.map((service) =>
                                <option value={service.id}>{service.name}</option>
                            )
                        }
                    </select>
                </div>
                <div className="form-className my-3">
                    <label htmlFor="">Vehiculo</label>
                    <select className="input-form" id="vehiculo"
                        onChange={(event) => setSelections({
                            ...selections,
                            vehicule: event.target.value,
                        })}>
                        <option></option>
                        {
                            listVehicules && listVehicules.map((vehicules) =>
                                <option value={vehicules.id}>{vehicules.type}</option>
                            )
                        }
                    </select>
                </div>
                <span className="fecha"> </span>
                <div className="form-className my-3">
                    <label htmlFor="">Fecha</label>
                    <input type="date" name="fecha" id="fecha"
                        onChange={(event) => setSelections({
                            ...selections,
                            date: event.target.value,
                        })} />
                </div>
                <div>
                    <input type="button" name="calcular precio" value="calcular precio" id="calcular"
                        onClick={calculatePrice} />
                </div>

                <div className="form-className my-3">
                    <label id="labelPrice" htmlFor="">Precio</label>
                    <input disabled type="text" name="price" id="price" value={price} />
                </div>




                <div>
                    <input type="button" name="Registrar" value="Registrar" id="Registrar"
                        onClick={registerData} />
                </div>
                <div style={{ marginTop: "15px" }}>
                    <Link to="/search" >
                        <button>Ir a listado de Autos</button>
                    </Link>
                </div>
            </form>

        </section>

        </div>
    )
}

export default RegistroAuto