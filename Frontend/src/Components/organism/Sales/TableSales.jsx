import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';

import '../../../assets/styles/Organism/TableSales.css'
import { Button } from '../../atoms/Buttons/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTextSlash } from '@fortawesome/free-solid-svg-icons';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';



export const TableSales=({data,onDelete,onSaveAll})=>{
    
    const handleGenerateReceipt = () => {
        if (data.length === 0) {
            alert('No hay productos en la venta');
            return;
        }
        onSaveAll();
    };
    
    
    return(
        <div className="sales-table-container">
            <DataTable value={data} emptyMessage="No hay productos agregados">
                <Column field="producto" header="Producto"></Column>
                <Column field="cantidad" header="Cantidad"></Column>
                <Column field="precio" header="Precio" body={(rowData) => `$${rowData.precio.toFixed(2)}`}></Column>
                <Column field="total" header="Total" body={(rowData) => `$${rowData.total.toFixed(2)}`}></Column>
                <Column
                    body={(rowData) => (
                        <button 
                            className="delete-button" 
                            onClick={() => onDelete(rowData)} 
                        >
                            <FontAwesomeIcon icon={faDeleteLeft} /> 
                        </button>
                    )}
                    style={{ width: "10%" }}
                />
            </DataTable>
            
            <div className="sales-actions">
                <Button 
                    text="Generar boleta" 
                    Icon={faTextSlash} 
                    onClick={handleGenerateReceipt}
                />
                <Button 
                    text="Guardar venta" 
                    Icon={faCheck} 
                    onClick={handleGenerateReceipt}
                />
            </div>
        </div>
    )
}