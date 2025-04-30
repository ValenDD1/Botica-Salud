import { Table } from "../DataTable/Table"
import { Title } from "../../atoms/Titles/Title"
import { Button } from "../../atoms/Buttons/Button"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"
import { useState,useEffect } from "react"
import '../../../assets/styles/Organism/users.css'
import { UserModal } from "../Modals/UsersModal"


const columns=[
    { field: 'id', header: 'ID' },
    { field: 'nombre_usuario', header: 'Nombre' },
    { field: 'correo', header: 'Correo' },
    { field: 'estado', header: 'Estado' },
]

export const UserTable=()=>{
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [editProduct, setEditProduct] = useState(null);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const [userdata, setUserData] = useState([]);
    const fetchUserData = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/usuarios"); 
            const transformedData = response.data.map(user => ({
                ...user,
                estado: user.estado === 1 ? 'Activo' : 'Inactivo'
            }))
            setUserData(transformedData);

            setLoading(false);
        } catch (error) {
            console.error("Error al obtener los productos:", error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleSaveuser = async (newUser) => {
        
        try {
            await axios.post("http://localhost:3000/api/usuarios", newUser); 
            fetchUserData(); 
        } catch (error) {
            console.error("Error al guardar el usuario:", error);
        }
    };

    const handleEditProduct = async (updateduser) => {
        if (!updateduser.id) {
            console.error("La ID del usuario no está definida");
            return; // Detener la acción si la ID no está presente
        }
        try {
            await axios.put(`http://localhost:3000/api/usuarios/${updateduser.id}`, updateduser); 
            fetchUserData();
            closeModal();
        } catch (error) {
            console.error("Error al editar el producto:", error);
        }
    };
    const handleEditClick = (product) => {
        setEditProduct(product); 
        openModal(); 
    };

    const handleDeleteProduct = async (deleteProduct) => {
        try {
            await axios.put(`http://localhost:3000/api/usuarios/delete/${deleteProduct.id}`);
            fetchUserData();
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
            
        }
    };




    return(
        <div className="user-container" >
            <section className="user-header">
                <Title title='Usuarios' hs="h3" ></Title>
                <Button text={'Agregar Usuario'} Icon={faPlus} onClick={() => { setEditProduct(null); openModal(); }}/>
            </section>
            <section >
                <Table 
                    data={userdata} 
                    column={columns} 
                    onEdit={handleEditClick}
                    onDelete={handleDeleteProduct}
                />
            </section>
            <UserModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onSave={editProduct ?  handleEditProduct:handleSaveuser }
                initialData={editProduct}
            
            />
            
        </div>
    )
}


