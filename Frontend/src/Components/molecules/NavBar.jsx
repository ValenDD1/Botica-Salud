//atomos
import { Text } from "../atoms/Titles/Text"
import { Title } from "../atoms/Titles/Title"
import { Button } from "../atoms/Buttons/Button"

import '../../assets/styles/Molecules/navBar.css'
import { Link } from "react-router-dom"
export const NavBar=({data}) => {
    return (
        <nav className="navbar" >
            <Title title='Botica Nova Salud' hs="h3"/>
            <ul className="nav-links" >
                {data.map((item,index) => (
                    <li key={index}>
                        <Link to={item?.link} >
                            <Text text={item?.text} icon={item?.icon} />
                        </Link>
                    </li>
                ))}
                    <Link  to={'/'} >
                        <Button text='Cerrar Sesion'/>
                    </Link>
                
            </ul>
        </nav>
    )
}