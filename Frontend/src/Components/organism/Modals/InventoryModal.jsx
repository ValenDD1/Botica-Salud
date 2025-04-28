import { useState,useEffect } from "react"
import '../../../assets/styles/Organism/modals/InventoryModal.css'
export const InventoryModal = ({ isOpen, onClose, onSave,initialData}) => {

    const [proveedor, setProveedor] = useState('');
    const [producto, setProducto] = useState('');
    const [stock, setStock] = useState('');
    const [marca, setMarca] = useState('');
    const [precioCompra, setPrecioCompra] = useState('');
    const [precioVenta, setPrecioVenta] = useState('');


    useEffect(() => {
        if (initialData) {
            setProveedor(initialData.nombre_proveedor || '');
            setProducto(initialData.producto || '');
            setStock(initialData.stock || '');
            setMarca(initialData.marca || '');
            setPrecioCompra(initialData.precio_compra || '');
            setPrecioVenta(initialData.precio_venta || '');
        }
    }, [initialData]);

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Validación de campos
            if (!proveedor || !producto || !stock || !marca || !precioCompra || !precioVenta) {
                throw new Error('Todos los campos son requeridos');
            }
    
            // Validación de campos numéricos
            if (isNaN(stock) || isNaN(precioCompra) || isNaN(precioVenta)) {
                throw new Error('Stock y precios deben ser valores numéricos');
            }
    
            const newProduct = { 
                nombre_proveedor: proveedor, 
                producto: producto,
                stock: parseInt(stock), 
                marca: marca,
                precio_compra: parseFloat(precioCompra), 
                precio_venta: parseFloat(precioVenta)
            };
    
            // Si ya estamos editando un producto, pasar la id
            if (initialData && initialData.id) {
                newProduct.id = initialData.id;
            }
    
            await onSave(newProduct); 
    
            resetForm();
            onClose();
            
        } 
        catch (error) {
            console.error('Error al guardar el producto:', error);
            // Show error to user (you could add error state to display it in UI)
            alert(error.message || 'Ocurrió un error al guardar el producto');
            
            if (error.message.includes('requeridos') || error.message.includes('numéricos')) {
                // Keep form data for user to correct
            } else {
                resetForm();
                onClose();
            }
        }
    };
    
    // Helper function to reset form fields
    const resetForm = () => {
        setProveedor('');
        setProducto('');
        setStock('');
        setMarca('');
        setPrecioCompra('');
        setPrecioVenta('');
    };
    
    // Add cleanup effect for when modal closes
    useEffect(() => {
        return () => {
            // This runs when component unmounts (modal closes)
            if (!isOpen && !initialData) {
                resetForm();
            }
        };
    }, [isOpen]);
    
    if (!isOpen) return null;
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>X</button>
                <h2>{initialData ? 'Editar Producto':'Guardar Producto'}</h2>
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

                    <button type="submit">{initialData ?  'Editar' : 'Guardar' }</button>
                </form>
            </div>
        </div>
    );
}
