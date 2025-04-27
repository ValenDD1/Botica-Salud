import { useState } from "react"
import { Title } from "../../atoms/Titles/Title"
import { Text } from "../../atoms/Titles/Text"
import { Input } from "../../atoms/Inputs/input"
import { SelecBox } from "../../atoms/Selecbox/SelecBox"
import { Button } from "../../atoms/Buttons/Button"

import { faSave } from "@fortawesome/free-solid-svg-icons"

const Data=[
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
]
import '../../../assets/styles/Organism/sales.css'

export const SalesForm=()=>{

    const [product,setProduct]=useState('');

    return(
        <div className="sales-container">
            <Title title='Registro de Ventas' hs="h3" />
            <form onSubmit={(e) => e.preventDefault()} className="sales-form">
                <section className="sales-questions" >
                    <Text text='nombre*' tag="label" />
                    <Input text='example' type={'text'} />
                    <Text text='Dni(opcional)' tag="label" />
                    <Input type={'number'} />
                </section>
                <section className="product-questions" >
                    <SelecBox value={product} onChange={(e) => setProduct(e.value)} data={Data} />
                    <Input text='Stock' type={'number'} />
                    
                </section>
                <section className="bolet" > 
                    <Text text='Precio' tag="label" />
                    <Input type={'number'} />
                    <Button text='Guardar' Icon={faSave} /> 
                </section>
            </form>
        </div>
    )
}