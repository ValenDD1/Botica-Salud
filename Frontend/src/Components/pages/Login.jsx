
//exportar los atomos y ver su funcionalidad
import { Button } from "../atoms/Buttons/Button"
import { Input } from "../atoms/Inputs/input"
import { Title } from "../atoms/Titles/Title"
import { Text } from "../atoms/Titles/Text"
import { Table } from "../atoms/DataTable/Table"

import {faBell} from '@fortawesome/free-solid-svg-icons'


const Data=[
    {
        id:1,
        name:'Luis',
        age:22
    },
    {
        id:2,
        name:'Luis',
        age:22
    },
    {
        id:3,
        name:'Luis',
        age:22
    }
]
const column=[
    {
        field:'id',
        header:'Id'
    },
    {
        field:'name',
        header:'Name'
    },
    {
        field:'age',
        header:'Age'
    }
]

export const Login=()=>{
    const handleEdit = (rowData) => {
        console.log('Edición de fila:', rowData);
    };
    return(
        <div>
            <Table 
                data={Data} 
                column={column} 
                onEdit={handleEdit}
            />
            <Button text='Notificaciones' Icon={faBell} ></Button>
            <Input text='Correo' type='search' ></Input>
            <Title title='Login' hs="h3" ></Title>
            <Text text='Login'></Text>
        </div>
    )
    
}