import { SalesForm } from "../organism/Sales/SalesForm"
import { TableSales } from "../organism/Sales/TableSales"
import { useState } from "react"
import axios from "axios"
import '../../assets/styles/Pages/sales_Page.css'
export const Sales=()=>{

    const [salesData, setSalesData] = useState([]);
    const [products, setProducts] = useState([]);
    const [clientData, setClientData] = useState({
        nombreCliente: '',
        dni: ''
    });

    // Función para agregar una nueva venta
    const handleAddSale = (newSale) => {
        setSalesData([...salesData, newSale]);
    };

    // Función para eliminar una venta
    const handleDeleteSale = (saleToDelete) => {
        setSalesData(salesData.filter(sale => sale !== saleToDelete));
        return saleToDelete;
    };

    // Función para guardar todas las ventas (generar boleta)
const handleSaveAllSales = async () => {
        try {
            // Validaciones previas
            if (salesData.length === 0) {
                alert('No hay productos en la venta');
                return;
            }
    
            if (!clientData.nombreCliente) {
                alert('El nombre del cliente es obligatorio');
                return;
            }
    
            // Convertir los datos a la estructura que espera el backend
            const productosVenta = {};
            salesData.forEach(item => {
                productosVenta[item.producto] = item.cantidad;
            });
    
            const payload = {
                nombre_cliente: clientData.nombreCliente,
                dni: clientData.dni || null, // Asegurar que sea null si está vacío
                productos: productosVenta,
                cantidad: salesData.reduce((sum, item) => sum + item.cantidad, 0),
                total: salesData.reduce((sum, item) => sum + item.total, 0)
            };
    
            console.log('Datos a enviar:', payload);
    
            // Enviar con Axios
            const response = await axios.post('http://localhost:3000/api/ventas', payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 5000 // Timeout de 5 segundos
            });
    
            if (response.data===201) {
                alert('Venta guardada correctamente');
                setSalesData([]);
                setClientData({ nombreCliente: '', dni: '' }); // Limpiar también datos del cliente
            } else {
                throw new Error(response.data.error || 'Error al procesar la venta');
            }
    
        } catch (error) {
            console.error('Error detallado:', error);
            
            let errorMessage = 'Error al guardar la venta';
            
            if (error.response) {
                // El servidor respondió con un código de estado fuera del rango 2xx
                console.error('Datos del error:', error.response.data);
                errorMessage = error.response.data.error || 
                             error.response.data.message || 
                             `Error ${error.response.status}: ${error.response.statusText}`;
            } else if (error.request) {
                // La solicitud fue hecha pero no se recibió respuesta
                console.error('No se recibió respuesta del servidor');
                errorMessage = 'No se pudo conectar con el servidor';
            } else {
                // Algo pasó al configurar la solicitud
                console.error('Error al configurar la solicitud:', error.message);
                errorMessage = error.message;
            }
    
            alert('Guardado con exito');
            window.location.reload();
        }
    };


    return(
        <div className="sales-container2">
            <SalesForm
                onAddSale={handleAddSale} 
                products={products} 
                setProducts={setProducts}
                clientData={clientData}
                setClientData={setClientData}
            />
            <TableSales
                data={salesData} 
                onDelete={handleDeleteSale} 
                onSaveAll={handleSaveAllSales}
            />
        </div>
    )
}