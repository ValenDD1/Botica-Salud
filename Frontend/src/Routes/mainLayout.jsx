import { Outlet } from 'react-router-dom';
import { DashBoard } from '../Components/pages/DashBoard';

import '../assets/styles/Pages/mainLayout.css'

const MainLayout = () => {
    return (
        <div className="main-layout">
            <DashBoard />  {/* El Navbar solo aparecerá en rutas con MainLayout */}
            <div className="content">
                <Outlet />  {/* Aquí se renderizan las páginas específicas */}
            </div>
        </div>
    )
}
export default MainLayout;