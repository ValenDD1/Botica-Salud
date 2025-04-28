import { useState,useEffect } from "react"
import '../../../assets/styles/Organism/modals/InventoryModal.css'
export const UserModal = ({ isOpen, onClose, onSave,initialData}) => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    


    useEffect(() => {
        if (initialData) {
            setUsername(initialData.nombre_usuario || '');
            setEmail(initialData.correo || '');
            setPassword(initialData.contrasena || '');
            setConfirmPassword(initialData.contrasena || '');
        }
    }, [initialData]);

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Validación de campos
            if (!username || !email || !password || !confirmPassword) { 
                throw new Error('Todos los campos son requeridos');
            }
    
    
            const newUser = { 
                nombre_usuario: username,
                correo: email,
                contrasena: password,
                estado:1
            };
    
            // Si ya estamos editando un producto, pasar la id
            if (initialData && initialData.id) {
                newUser.id = initialData.id;
            }
    
            await onSave(newUser); 
    
            resetForm();
            onClose();
            
        } 
        catch (error) {
            console.error('Error al guardar el usuario:', error);
            
            alert(error.message || 'Ocurrió un error al guardar el usuario');
            
            if (error.message.includes('requeridos') || error.message.includes('numéricos')) {
                
            } else {
                resetForm();
                onClose();
            }
        }
    };
    
    const resetForm = () => {
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };
    
    useEffect(() => {
        return () => {
            if (!isOpen && !initialData) {
                resetForm();
            }
        };
    }, [isOpen]);
    
    if (!isOpen) return null;
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>X</button>
                <h2>{initialData ? 'Editar Usuario':'Guardar Usuario'}</h2>
                <form onSubmit={handleSubmit}>
                    <label>nombre de Usuario:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />

                    <label>Correo:</label>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />

                    {
                        !initialData && (
                            <>
                                <label>Contraseña:</label>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                                <label>Confirmar Contraseña:</label>
                                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                            </>
                        )
                    }
                    
                    <button type="submit">{initialData ?  'Editar' : 'Guardar' }</button>
                </form>
            </div>
        </div>
    );
}




