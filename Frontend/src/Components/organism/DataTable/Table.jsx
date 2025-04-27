import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import '../../../assets/styles/Atoms/table.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

export const Table = ({data, column, onEdit}) => {
    
    return (
        <div>
            <DataTable
                className="data-table"
                value={data}
                paginator
                rows={6}
                scrollable
                scrollHeight="600px"
            >
                {column.map ((col, index) => {
                    
                    return (
                        <Column
                            key={index}
                            field={col.field}
                            header={col.header}
                        />
                    );
                })}
                
                <Column
                    body={(rowdata) => (
                        <button 
                            className="edit-button" 
                            onClick={ () => onEdit(rowdata)} 
                            >
                            <FontAwesomeIcon icon={faEdit} /> 
                        </button>
                    )}
                    style={{ width: "10%" }}
                />
            </DataTable>
        </div>
    )
}