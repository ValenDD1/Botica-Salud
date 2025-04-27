import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';

import '../../../assets/styles/Organism/TableSales.css'
import { Button } from '../../atoms/Buttons/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTextSlash } from '@fortawesome/free-solid-svg-icons';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';

const Data=[
    {
        producto:'papa',
        cantidad:10,
        precio:100,
        total:1000
    },
    {
        producto:'papa',
        cantidad:10,
        precio:100,
        total:1000
    },
    {
        producto:'papa',
        cantidad:10,
        precio:100,
        total:1000
    },
    {
        producto:'papa',
        cantidad:10,
        precio:100,
        total:1000
    }
]

export const TableSales=({onDelete})=>{
    return(
        <div className="sales-table-container" >
            <DataTable value={Data} >
                <Column field="producto" header="Producto" ></Column>
                <Column field="cantidad" header="Cantidad" ></Column>
                <Column field="precio" header="Precio" ></Column>
                <Column field="total" header="Total" ></Column>
                <Column
                    body={(rowdata) => (
                        <button 
                            className="delete-button" 
                            onClick={ () => onDelete(rowdata)} 
                        >
                            <FontAwesomeIcon icon={faDeleteLeft} /> 
                        </button>
                    )}
                    style={{ width: "10%" }}
                />
            </DataTable>
            <Button text="generar boleta" Icon={faTextSlash} />
        </div>
    )
}