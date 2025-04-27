import '../../../assets/styles/Atoms/button.css';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
export const Button = ({text,Icon})=>{
    return(
        <button 
            className='Button-salud'
        >
            { Icon && <FontAwesomeIcon icon={Icon} />}
            {text}
        </button>
        
    )
}