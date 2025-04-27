import { Text } from "../atoms/Titles/Text"
import { Title } from "../atoms/Titles/Title"
import { Input } from "../atoms/Inputs/input"
import { Button } from "../atoms/Buttons/Button"

//de fontawosome
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { faLock } from "@fortawesome/free-solid-svg-icons"
import { faCheck } from "@fortawesome/free-solid-svg-icons"



export const LoginForm=()=>{

    const HandleClick=()=>{
        console.log("Bienvenido");
    }


    return(
        <form action="" method="post" >
            <div className="login-container" >
                <section className="login-header" >
                    <Title>Botica Nova Salud</Title>
                </section>
                <section className="login-form" >
                    <Text text="usuario" icon={faUser} tag="label" ></Text>
                    <Input text="example" type="text"  />

                    <Text text="contraseña" icon={faLock} tag="label" />
                    <Input text={"example"} type={"password"} />
                </section>
            </div>
            <Button text="Ingresar" icon={faCheck} onClick={HandleClick} />

        </form>
    )
}

