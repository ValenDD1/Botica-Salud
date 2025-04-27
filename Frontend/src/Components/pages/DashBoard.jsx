import { NavBar } from "../molecules/NavBar"
import { Text } from "../atoms/Titles/Text"


//importaremos los icons
import { faStore } from "@fortawesome/free-solid-svg-icons"
import { faMoneyBill } from "@fortawesome/free-solid-svg-icons"
import { faHistory } from "@fortawesome/free-solid-svg-icons"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { faPhone } from "@fortawesome/free-solid-svg-icons"

const Data=[
    {
        link:'/inventario',
        text:'inventario',
        icon:faStore
    },
    {
        link:'/ventas',
        text:'ventas',
        icon:faMoneyBill
    },
    {
        link:'/historial',
        text:'historial',
        icon:faHistory
    },
    {
        link:'/usuarios',
        text:'Usuario',
        icon:faUser
    },
    {
        link:'/servicios',
        text:'Servicio al cliente',
        icon:faPhone
    },
]

export const DashBoard=()=>{
    return(
        <div>
            <NavBar data={Data} />
        </div>
    )
}