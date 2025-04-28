import axios from "axios"
import { useState,useEffect } from "react"
import { Table } from "../organism/DataTable/Table"
import { Title } from "../atoms/Titles/Title"
import { Button } from "../atoms/Buttons/Button"
import { Input } from "../atoms/Inputs/input"
import { Text } from "../atoms/Titles/Text"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { ServiceModal } from "../organism/Modals/ServiceModal"

import '../../assets/styles/Pages/clientservices.css'

const columns=[
    {field:'nombre_victima', header:'Cliente'},
    {field:'queja', header:'Asunto'},
    {field:'fecha_caso', header:'fecha'},
    {field:'detalles', header:'Detalles'},
    {field:'tipo_queja', header:'Tipo de asunto'},
    {field:'estado', header:'Estado'},

]
export const ClientServices=()=>{

    const [servicesData, setServicesData] = useState([]);
    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const fetchServicesData=async()=>{
        try {
            const response = await axios.get("http://localhost:3000/api/atencion"); 
            
            //reorganiza la data
            const transformedData = response.data.map(service => ({
                ...service,
                estado: service.estado === 1 ? 'Pendiente' : 'Atendido' // Cambia 0 por 'Pendiente' y 1 por 'Atendido'
            }));
            setServicesData(transformedData);
            setLoading(false);
        } catch (error) {
            console.error("Error al obtener los productos:", error);
        }
    }
    const handleSaveService = async (newService) => {
        
        try {
            await axios.post("http://localhost:3000/api/atencion", newService); 
            fetchServicesData(); 
        } catch (error) {
            console.error("Error al guardar el producto:", error);
        }
    };

    const handleStateService=async(e)=>{
        try {
            await axios.put(`http://localhost:3000/api/atencion/delete/${e.id}`);
            fetchServicesData(); 
        } catch (error) {
            console.error("Error al guardar el producto:", error);
        }
    }

    useEffect(() => {
        fetchServicesData();
    }, []);


    return(
        <div className="ClientServices-container" >
            <section className="ClientServices-header" >
                <Title title="Servicios de Clientes" hs="h3" ></Title>
                <Button text="Agregar Asunto" Icon={faPlus} onClick={() => openModal()} ></Button>
            </section>
            <section className="ClientServices-table">
                <Text text="Gestiona los Asuntos de los clientes y ve si han sido atendidos " tag="span" />
                <Table
                    column={columns}
                    data={servicesData}
                    onDelete={handleStateService}
                />
            </section>

            <ServiceModal 
                isOpen={isModalOpen} 
                onClose={closeModal} 
                onSave={handleSaveService}
                
            />

        </div>
    )
}