import { Table } from "../DataTable/Table"
import {Title} from "../../atoms/Titles/Title"
import { Text } from "../../atoms/Titles/Text"
import { Button }  from "../../atoms/Buttons/Button"
import {Input} from "../../atoms/Inputs/input"
import { faPlus } from "@fortawesome/free-solid-svg-icons"


import '../../../assets/styles/Organism/inventory.css'
import { useState } from "react"
import { InventoryModal } from "../Modals/InventoryModal"


const Data=[
    {
        id:1,
        proveedor:'Proveedor 1',
        producto:'Producto 1',
        stock:10,
        fecha:'2023-01-01',
        marca:'Marca 1',
        precio_compra:100,
        precio_venta:200
    },
    {
        id:2,
        proveedor:'Proveedor 2',
        producto:'Producto 2',
        stock:20,
        fecha:'2023-02-01',
        marca:'Marca 2',
        precio_compra:200,
        precio_venta:300
    },
    {
        id:3,
        proveedor:'Proveedor 3',
        producto:'Producto 3',
        stock:30,
        fecha:'2023-03-01',
        marca:'Marca 3',
        precio_compra:300,
        precio_venta:400
    }
]
const columns=[
    {field:'id', header:'ID'},
    {field:'proveedor', header:'Proveedor'},
    {field:'producto', header:'Producto'},
    {field:'stock', header:'Stock'},
    {field:'fecha', header:'Fecha'},
    {field:'marca', header:'Marca'},
    {field:'precio_compra', header:'Precio Compra'},
    {field:'precio_venta', header:'Precio Venta'},
]

export const InventoryTable = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inventoryData, setInventoryData] = useState(Data);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="inventory-container">
            <section className="inventory-header">
                <div className="header-title" >
                    <Title title='Inventario' hs="h3" ></Title>
                    <Button text='Agregar Producto' Icon={faPlus}  ></Button>
                </div>
                <div className="header-actions">
                    <Input text='Buscar ' type={'search'}/>
                </div>
            </section>
            <section>
                <Table 
                    data={Data} 
                    column={columns}
                />
            </section>


        </div>  
    )
}