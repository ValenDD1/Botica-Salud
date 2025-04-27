import { useState } from "react"

import '../../../assets/styles/Organism/modals/InventoryModal.css'
export const InventoryModal = ({ isOpen, onClose, onSave}) => {

    const [proveedor, setProveedor] = useState('');
    const [producto, setProducto] = useState('');
    const [stock, setStock] = useState('');
    const [marca, setMarca] = useState('');
    const [precioCompra, setPrecioCompra] = useState('');
    const [precioVenta, setPrecioVenta] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProduct = { proveedor, producto, stock, marca, precioCompra, precioVenta };
        onSave(newProduct); 
        onClose(); 
    };
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>X</button>
                <h2>Agregar Producto</h2>
                <form onSubmit={handleSubmit}>
                    <label>Proveedor:</label>
                    <input type="text" value={proveedor} onChange={(e) => setProveedor(e.target.value)} required />

                    <label>Producto:</label>
                    <input type="text" value={producto} onChange={(e) => setProducto(e.target.value)} required />

                    <label>Stock:</label>
                    <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} required />

                    <label>Marca:</label>
                    <input type="text" value={marca} onChange={(e) => setMarca(e.target.value)} required />

                    <label>Precio Compra:</label>
                    <input type="number" value={precioCompra} onChange={(e) => setPrecioCompra(e.target.value)} required />

                    <label>Precio Venta:</label>
                    <input type="number" value={precioVenta} onChange={(e) => setPrecioVenta(e.target.value)} required />

                    <button type="submit">Guardar</button>
                </form>
            </div>
        </div>
    );
}
