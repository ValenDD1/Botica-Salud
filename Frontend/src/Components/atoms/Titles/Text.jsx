import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import '../../../assets/styles/Atoms/text.css'
export const Text=({text,icon,tag='p'})=>{
    const Tag=tag;
    return(
        <Tag
            className='Text-salud'
        >
            {icon && <FontAwesomeIcon icon={icon} />}{text}
        </Tag>
    )
}