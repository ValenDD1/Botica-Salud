import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import '../../../assets/styles/Atoms/title.css'

export const Title=({title,icon,hs='h1'})=>{
    return React.createElement(
        hs,
        null,
        <>
            {icon && <FontAwesomeIcon icon={icon} />}{title}
        </>
    )
}