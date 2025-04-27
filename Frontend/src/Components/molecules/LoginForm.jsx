import { Text } from "../atoms/Titles/Text"
import { Title } from "../atoms/Titles/Title"
import { Input } from "../atoms/Inputs/input"
import { Button } from "../atoms/Buttons/Button"

//de fontawosome
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { faLock } from "@fortawesome/free-solid-svg-icons"
import { faCheck } from "@fortawesome/free-solid-svg-icons"


import '../../assets/styles/Molecules/loginForm.css'

import { useState, useRef } from "react"
import { Toast } from 'primereact/toast';
import { useNavigate } from "react-router-dom"

export const LoginForm=()=>{

    const [user,setUser]=useState("");
    const [password,setPassword]=useState("");
    const [error,setError]=useState('Usuario o contraseña incorrectos');
    const toast = useRef(null);
    const navigate = useNavigate();


    const HandleClick = (e) => {
        e.preventDefault();
        // Verificar si el usuario y la contraseña son correctos
        if (user === 'admin' && password === 'admin') {
            console.log("Bienvenido");
            
            navigate('/inventario');

            setError(''); 
        } else {
            toast.current.show({ 
                severity: 'error', 
                summary: 'Error', 
                detail: error, 
                life: 3000 }
            )
        }
    };


    return(


        <form onSubmit={HandleClick}>
            <Toast ref={toast} />
            
            <div className="login-container" >
                <section className="login-header" >
                    <Title title="botica nova Salud" hs="h3"/>
                </section>
                <section className="login-form" >
                    <Text text="usuario" icon={faUser} tag="label" ></Text>
                    <Input text="example" type="text" value={user} onChange={(e) => setUser(e.target.value)}   />

                    <Text text="contraseña" icon={faLock} tag="label" />
                    <Input text={"example"} type={"password"} value={password} onChange={(e) => setPassword(e.target.value)} />
                </section>
                <Button 
                    text="Ingresar" 
                    icon={faCheck} 
                    onClick={HandleClick} 
                />
            </div>
            

        </form>
    )
}

