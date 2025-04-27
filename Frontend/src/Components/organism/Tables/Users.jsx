import { Table } from "../DataTable/Table"
import { Title } from "../../atoms/Titles/Title"
import { Button } from "../../atoms/Buttons/Button"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

import '../../../assets/styles/Organism/users.css'


const Data=[
    {
        id:1,
        name:'admin',
        email:'dsy@dsy.com',
        estado:'Activo',
    },
    {
        id:2,
        name:'admin',
        email:'dsy@dsy.com',
        estado:'Activo',
    },
    {
        id:3,
        name:'admin',
        email:'dsy@dsy.com',
        estado:'Activo',
    },
    {
        id:4,
        name:'admin',
        email:'dsy@dsy.com',
        estado:'Activo',
    }
]
const columns=[
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Nombre' },
    { field: 'email', header: 'Correo' },
    { field: 'estado', header: 'Estado' },
]

export const UserTable=()=>{
    return(
        <div className="user-container" >
            <section className="user-header">
                <Title title='Usuarios' hs="h3" ></Title>
                <Button text={'Agregar Usuario'} Icon={faPlus} />
            </section>
            <section >
                <Table data={Data} column={columns} />
            </section>
            
        </div>
    )
}


