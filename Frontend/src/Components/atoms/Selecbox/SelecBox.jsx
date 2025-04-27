import { Dropdown } from 'primereact/dropdown';
import { useState } from 'react';
export const SelecBox=({value,onChange,data})=>{

    
    return(
        < Dropdown
            value={value}
            onChange={onChange}
            options={data}
            placeholder="Seleccione"
        />
    )
}