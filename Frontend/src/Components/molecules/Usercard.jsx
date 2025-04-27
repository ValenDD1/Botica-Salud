//atomos
import { Text } from "../atoms/Titles/Text"
import { Title } from "../atoms/Titles/Title"

import '../../assets/styles/Molecules/usercard.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
export const Usercard=({data})=>{
    return(
        <div className="user-card" onClick={data?.onClick} >
            <section className="user-card-header">
                <FontAwesomeIcon icon={data?.icono} />
            </section>
            <section className="user-card-body" > 
                <Title title={data?.nombre} hs="h4" />
                <Text text={data?.cantidad} tag="span" />
            </section>
        </div>
    )
}