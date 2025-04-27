import '../../../assets/styles/Atoms/button.css';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

export const Button = ({text,Icon,onClick})=>{
    return(
        <button 
            className='Button-salud'
            onClick={onClick}
        >
            { Icon && <FontAwesomeIcon icon={Icon} />}
            {text}
        </button>
        
    )
}