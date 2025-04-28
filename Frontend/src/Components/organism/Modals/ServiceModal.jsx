import { useState,useEffect } from "react"
import '../../../assets/styles/Organism/modals/ServiceModal.css'
import { Dropdown } from "primereact/dropdown";


export const ServiceModal=({isOpen,onClose,onSave})=>{

    const [nombre, setNombre] = useState('');
    const [queja, setQueja] = useState('');
    const [detalles, setDetalles] = useState('');
    const [tipoQueja, setTipoQueja] = useState('');
    

    const handleSunmit=async(e)=>{
        e.preventDefault();
        const newService={
            nombre_victima:nombre,
            queja:queja,
            detalles:detalles,
            tipo_queja:tipoQueja
        };

        await onSave(newService);
        resetForm();
        onClose();
    }

    const resetForm=()=>{
        setDetalles('');
        setQueja('');
        setTipoQueja('');
        setNombre('');
    }
    if (!isOpen) return null;

    const cities = [
        { name: 'producto Vencido', code: 'NY' },
        { name: 'Producto Incorrecto', code: 'RM' },
        { name: 'Discriminacion', code: 'LDN' },
        { name: 'Entrega Inconclusa', code: 'IST' },
        { name: 'otro', code: 'PRS' }
    ];


    return(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>X</button>
                <h2>Crear Asunto</h2>
                <form onSubmit={handleSunmit}>
                    <label>Nombre del cliente:</label>
                    <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />

                    <label>Titulo del Asunto:</label>
                    <input type="text" value={queja} onChange={(e) => setQueja(e.target.value)} required />

                    <label>Asunto:</label>
                    <textarea 
                        value={detalles} onChange={(e) => setDetalles(e.target.value)} 
                        placeholder="escribe algo" name="" id=""
                        required
                    >
                        
                    </textarea>

                    <label>Tipo de Asunto:</label>
                    <Dropdown 
                        value={tipoQueja} 
                        optionLabel="name" 
                        optionValue="code"
                        onChange={(e) => setTipoQueja(e.value)} 
                        options={cities} 
                        placeholder="Selecciona"
                    />

                    <button type="submit">Crear</button>
                </form>
            </div>
        </div>
    )
}