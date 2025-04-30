import '../../../assets/styles/Atoms/input.css'

export const Input = ({text,type,value,onChange,readOnly=false})=>{
    return(
        
        <input 
            className='Input-salud'
            type={type}
            placeholder={text}   
            value={value}
            onChange={onChange}
            readOnly={readOnly}
        />
        
    )
};