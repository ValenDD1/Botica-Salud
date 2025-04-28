import { Table } from "../DataTable/Table"
import {Title} from "../../atoms/Titles/Title"
import { Text } from "../../atoms/Titles/Text"
import { Button }  from "../../atoms/Buttons/Button"
import {Input} from "../../atoms/Inputs/input"
import { faPlus } from "@fortawesome/free-solid-svg-icons"


import '../../../assets/styles/Organism/inventory.css'
import { useState, useEffect } from "react"
import { InventoryModal } from "../Modals/InventoryModal"
import axios from "axios"

const columns=[
    {field:'id', header:'ID'},
    {field:'nombre_proveedor', header:'Proveedor'},
    {field:'producto', header:'Producto'},
    {field:'stock', header:'Stock'},
    {field:'fecha', header:'Fecha'},
    {field:'marca', header:'Marca'},
    {field:'precio_compra', header:'Precio Compra'},
    {field:'precio_venta', header:'Precio Venta'},
]

export const InventoryTable = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const [loading, setLoading] = useState(true);
    const [editProduct, setEditProduct] = useState(null);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const [inventoryData, setInventoryData] = useState([]);

    const fetchInventoryData = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/inventario"); 
            setInventoryData(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error al obtener los productos:", error);
        }
    };

    useEffect(() => {
        fetchInventoryData();
    }, []);

    const handleSaveProduct = async (newProduct) => {
        
        try {
            await axios.post("http://localhost:3000/api/inventario", newProduct); 
            fetchInventoryData(); 
        } catch (error) {
            console.error("Error al guardar el producto:", error);
        }
    };

    const handleEditProduct = async (updatedProduct) => {
        if (!updatedProduct.id) {
            console.error("La ID del producto no está definida");
            return; // Detener la acción si la ID no está presente
        }
        try {
            await axios.put(`http://localhost:3000/api/inventario/${updatedProduct.id}`, updatedProduct); 
            fetchInventoryData();
            closeModal();
        } catch (error) {
            console.error("Error al editar el producto:", error);
        }
    };
    const handleDeleteProduct = async (deleteProduct) => {
        try {
            await axios.delete(`http://localhost:3000/api/inventario/${deleteProduct.id}`);
            fetchInventoryData(); 
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
            
        }
    };

    const handleEditClick = (product) => {
        setEditProduct(product); 
        openModal(); 
    };

    return (
        <div className="inventory-container">
            <section className="inventory-header">
                <div className="header-title" >
                    <Title title='Inventario' hs="h3" ></Title>
                    <Button text='Agregar Producto' Icon={faPlus} onClick={() => { setEditProduct(null); openModal(); }}></Button>
                </div>
                <div className="header-actions">
                    <Input text='Buscar ' type={'search'}/>
                </div>
            </section>
            <section>
                <Table 
                    data={inventoryData} 
                    column={columns}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteProduct}
                />
            </section>
            <InventoryModal 
                isOpen={isModalOpen} 
                onClose={closeModal} 
                onSave={editProduct ? handleEditProduct : handleSaveProduct} 
                initialData={editProduct} 
            />
        </div>  
    )
}