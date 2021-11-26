import React, { useState, useEffect } from 'react'
import axios from "axios"

const Search = () => {

    const [listSearch, setListSearch] = useState([])

    useEffect(()=>{
        getSearch()
    },[])

    const getSearch = () => {
            axios.get("http://localhost:8081/api/Produccion/all").then((response) => {
            setListSearch(response.data)
        })
    }

  

    return (
        <div>
            <table border="0" cellspacing="5" cellpadding="5">
                <tbody>
                    <tr>
                        <td>Desde:</td>
                        <td><input type="text" id="min" name="min" /></td>
                        <td><select class="select-table-filter" data-table="order-table">
                            <option selected="true" value="">Todos los funcionarios</option>
                            <option value="Gabriel">Hari Namakura</option>
                            <option value="Diego">Diego Angarita</option>
                            <option value="Juan"> Esteban Ayala</option>
                            <option value="Fernanda">Fernanda</option>
                        </select></td>
                    </tr>
                    <tr>
                        <td>Hasta:</td>
                        <td><input type="text" id="max" name="max" /></td>
                        <td><select type="search" class="select-table-filter" data-table="order-table">
                            <option selected="true" value="">Seleccione Servicio</option>
                            <option value="lavado">Lavado</option>
                            <option value="secado">Secado</option>
                        </select></td>
                    </tr>

                </tbody>
            </table>

            <table id="TablaDatos" class="order-table" style={{ width: "100%" }}>
                <thead>
                    <tr>
                        <th>Vehiculo</th>
                        <th>Funcionario</th>
                        <th>Servicio</th>
                        <th>Fecha</th>
                        <th>Precio</th>
                    </tr>
                    <tr>
                        <td>{listSearch && listSearch.map((Search)=>Search.vehiculo.type)}</td>
                        <td>{listSearch && listSearch.map((Search)=>Search.funcionario.name)}</td>
                        <td>{listSearch && listSearch.map((Search)=>Search.servicio.name)}</td>
                        <td>{listSearch && listSearch.map((Search)=>Search.fecha)}</td>
                        <td>{listSearch && listSearch.map((Search)=>Search.totalPrice)}</td>
                    </tr>

                </thead>

            </table>
        </div >
    )
}

export default Search