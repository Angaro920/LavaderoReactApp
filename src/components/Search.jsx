/* eslint-disable */
import React, { useState, useEffect } from 'react'
import axios from "axios"
import moment from "moment"
import { portBackend } from "./portBackend"

const Search = () => {
    const [listAll, setListAll] = useState([])
    const [listSearch, setListSearch] = useState([])
    const [listFunctionaries, setListFunctionaries] = useState([])
    const [listServices, setListServices] = useState([])

    const [dateFilter, setDateFilter] = useState({
        initial: 0,
        end: 0
    })

    const daysBetweenDates = (startDate, endDate) => {
        let dates = [];
        let currDate = moment(startDate).startOf('day');
        let lastDate = moment(endDate).add(1, 'days').startOf('day');
        while (currDate.add(1, 'days').diff(lastDate) <= 0) {
            dates.push(currDate.clone().toDate());
        }
        return dates;
    };

    useEffect(() => {
        const { initial, end } = dateFilter
        if (initial === 0) {

        } else if (end === 0) {

        } else {
            const datePeriods = daysBetweenDates(moment(new Date(initial)), moment(new Date(end))).map((date) => moment(date).startOf('day').valueOf())
            setListSearch(listAll.filter(({ fecha }) => datePeriods.includes(moment(new Date(fecha)).startOf('day').valueOf())))
        }
    }, [dateFilter])

    useEffect(() => {
        getSearch()
        getFunctionaries()
        getServices()
    }, [])

    const getSearch = () => {
        axios.get("http://localhost:" + portBackend + "/api/Produccion/all").then((response) => {
            console.log({ response })
            setListAll(response.data)
            setListSearch(response.data)
        }).catch((error) => console.error(error))
    }
    const getFunctionaries = () => {
        axios.get("http://localhost:" + portBackend + "/api/Funcionario/all").then((response) => {
            setListFunctionaries(response.data)
        })
    }

    const getServices = () => {
        axios.get("http://localhost:" + portBackend + "/api/Servicio/all").then((response) => {
            setListServices(response.data)
        })
    }

    const filterByFunctionary = (functionaryID) => {
        setListSearch(functionaryID === "" ? listAll : listAll.filter(({ funcionario }) => funcionario.id === parseInt(functionaryID)))
    }

    const filterByService = (serviceID) => {
        setListSearch(serviceID === "" ? listAll : listAll.filter(({ servicio }) => servicio.id === parseInt(serviceID)))
    }

    return (
        <div>
            <table border="0" cellspacing="5" cellpadding="5">
                <tbody>
                    <tr>
                        <td>Desde:</td>
                        <td><input type="date" id="min" name="min"
                            onChange={(event) => setDateFilter({ ...dateFilter, initial: event.target.value })} />
                        </td>
                        <td><select class="select-table-filter" data-table="order-table"
                            onChange={(event) => filterByFunctionary(event.target.value)}>
                            <option selected="true" value="" >Todos los funcionarios</option>
                            {
                                listFunctionaries && listFunctionaries.map((functionary) =>
                                    <option value={functionary.id}>{functionary.name}</option>
                                )
                            }
                        </select></td>
                    </tr>
                    <tr>
                        <td>Hasta:</td>
                        <td><input type="date" id="max" name="max"
                            onChange={(event) => setDateFilter({ ...dateFilter, end: event.target.value })} />
                        </td>
                        <td><select type="search" class="select-table-filter" data-table="order-table"
                            onChange={(event) => filterByService(event.target.value)}>
                            <option value="">Todos los servicios</option>
                            {
                                listServices && listServices.map((service) =>
                                    <option value={service.id}>{service.name}</option>
                                )
                            }
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
                </thead>
                {
                    listSearch && listSearch.map(({ vehiculo, funcionario, servicio, fecha, totalPrice }) =>
                        <tr>
                            <td>{vehiculo.type}</td>
                            <td>{funcionario.name}</td>
                            <td>{servicio.name}</td>
                            <td>{fecha}</td>
                            <td>{totalPrice}</td>
                        </tr>
                    )
                }
            </table>
        </div >
    )
}

export default Search