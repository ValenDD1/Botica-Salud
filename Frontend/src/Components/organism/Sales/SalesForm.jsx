import { useState,useEffect } from "react"
import { Title } from "../../atoms/Titles/Title"
import { Text } from "../../atoms/Titles/Text"
import { Input } from "../../atoms/Inputs/input"
import {Dropdown} from 'primereact/dropdown'
import { Button } from "../../atoms/Buttons/Button"

import { faSave } from "@fortawesome/free-solid-svg-icons"


import '../../../assets/styles/Organism/sales.css'

export const SalesForm=({onAddSale,products,setProducts,clientData, setClientData})=>{

    const [formData, setFormData] = useState({
        producto: null,
        stock: 0,
        precio: 0,
        cantidad: 0,
        total: 0
    });

    // Cargar productos al montar el componente
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/inventario');
                const data = await response.json();
                setProducts(data.map(item => ({
                    label: item.producto,
                    value: item.id,
                    stock: item.stock,
                    precio: item.precio_venta
                })));
            } catch (error) {
                console.error('Error al cargar productos:', error);
            }
        };
        
        fetchProducts();
    }, [setProducts]);

    // Actualizar stock y precio cuando se selecciona un producto
    useEffect(() => {
        if (formData.producto) {
            const selected = products.find(p => p.value === formData.producto);
            if (selected) {
                setFormData(prev => ({
                    ...prev,
                    stock: selected.stock,
                    precio: selected.precio,
                    cantidad: 0,
                    total: 0
                }));
            }
        }
    }, [formData.producto, products]);

    // Calcular total cuando cambia la cantidad
    useEffect(() => {
        if (formData.cantidad > 0 && formData.cantidad <= formData.stock) {
            setFormData(prev => ({
                ...prev,
                total: (formData.cantidad * formData.precio).toFixed(2)
            }));
        } else {
            setFormData(prev => ({ ...prev, total: 0 }));
        }
    }, [formData.cantidad, formData.precio, formData.stock]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!formData.producto || formData.cantidad <= 0 || formData.cantidad > formData.stock) {
            alert('Por favor complete todos los campos correctamente');
            return;
        }

        const selectedProduct = products.find(p => p.value === formData.producto);
        
        const newSale = {
            producto: selectedProduct.label,
            cantidad: parseInt(formData.cantidad),
            precio: parseFloat(formData.precio),
            total: parseFloat(formData.total),
            productId: formData.producto
        };

        onAddSale(newSale);
        
        // Resetear el formulario
        setFormData(prev => ({
            ...prev,
            cantidad: 0,
            total: 0
        }));
    };
    console.log(products)

    return (
        <div className="sales-container">
            <Title title='Registro de Ventas' hs="h3" />
            <form onSubmit={handleSubmit} className="sales-form">
                <section className="sales-questions">
                    <Text text='Nombre*' tag="label" />
                    <Input 
                        value={clientData.nombreCliente}
                        onChange={(e) => setClientData({...clientData, nombreCliente: e.target.value})}
                        placeholder="Nombre del cliente" 
                        type="text" 
                        required
                    />
                    <Text text='DNI (opcional)' tag="label" />
                    <Input 
                        value={clientData.dni}
                        onChange={(e) => setClientData({...clientData, dni: e.target.value})}
                        type="text" 
                        placeholder="DNI del cliente"
                    />
                </section>
                <section className="product-questions">
                    <Text text='Producto*' tag="label" />
                    <Dropdown 
                        value={formData.producto} 
                        options={products} 

                        onChange={(e) => setFormData({...formData, producto: e.value})}
                        placeholder="Seleccione un producto"
                    />
                    
                    <Text text='Stock' tag="label" />
                    <Input 
                        value={formData.stock}
                        readOnly={true}
                        type="number" 
                    />
                    
                    <Text text='Precio del producto' tag="label" />
                    <Input 
                        value={formData.precio}
                        readOnly={true}
                        type="number" 
                    />
                </section>
                <section className="bolet"> 
                    <Text text='Cantidad*' tag="label" />
                    <Input 
                        value={formData.cantidad}
                        onChange={(e) => {
                            const value = parseInt(e.target.value) || 0;
                            setFormData({...formData, cantidad: value});
                        }}
                        type="number" 
                        min="1"
                        max={formData.stock}
                    />

                    <Text text='Total' tag="label" />
                    <Input 
                        value={formData.total}
                        readOnly={true}
                        type="number" 
                    />

                    <Button text='Agregar Producto' Icon={faSave} type="submit" />
                </section>
            </form>
        </div>
    );
}