//atomos
import { Text } from "../atoms/Titles/Text"
import { Title } from "../atoms/Titles/Title"

import '../../assets/styles/Molecules/navBar.css'
import { Link } from "react-router-dom"
export const NavBar=({data}) => {
    return (
        <nav className="navbar" >
            <Title title='Botica Nova Salud' hs="h2"/>
            <ul className="nav-links" >
                {data.map((item) => (
                    <li>
                        <Link to={item?.link} >
                            <Text text={item?.text} icon={item?.icon} />
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}