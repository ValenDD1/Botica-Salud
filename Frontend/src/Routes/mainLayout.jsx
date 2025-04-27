import { Outlet } from 'react-router-dom';
import { NavBar } from '../Components/molecules/NavBar';


const MainLayout = () => {
    return (
        <>
            <NavBar />  {/* El Navbar solo aparecerá en rutas con MainLayout */}
            <Outlet />  {/* Aquí se renderizan las páginas específicas */}
        </>
    )
}
export default MainLayout;