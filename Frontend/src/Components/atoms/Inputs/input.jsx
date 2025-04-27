import '../../../assets/styles/Atoms/input.css'

export const Input = ({text,type})=>{
    return(
        
        <input 
            className='Input-salud'
            type={type}
            placeholder={text}   
        
        />
        
    )
};