import { Text } from "../atoms/Titles/Text"
import { Title } from "../atoms/Titles/Title"


export const NavBar=() => {
    return (
        <nav>
            <ul>
                <li><a href="#">Inicio</a></li>
                <li><a href="#">Productos</a></li>
                <li><a href="#">Contacto</a></li>
            </ul>
        </nav>
    )
}