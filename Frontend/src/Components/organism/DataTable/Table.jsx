import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import '../../../assets/styles/Atoms/table.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export const Table = ({data, column, onEdit, onDelete}) => {
    
    return (
        <div>
            <DataTable
                className="data-table"
                value={data}
                paginator
                rows={6}
                scrollable
                tableStyle={{ minWidth: '50rem' }}
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

                <Column
                    body={(rowdata) => (
                        <button 
                            className="delete-button" 
                            onClick={ () => onDelete(rowdata)} 
                            >
                            <FontAwesomeIcon icon={faTrash} /> 
                        </button>
                    )}
                    style={{ width: "10%" }}
                />
            </DataTable>
        </div>
    )
}