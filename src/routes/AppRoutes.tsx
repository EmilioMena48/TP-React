import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Componentes from "../pages/Componentes";
import Administración from "../pages/Administracion";

const AppRoutes: React.FC = () => {

    return(
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/componentes" element={<Componentes/>}/>
            <Route path="/administracion" element={<Administración/>}/>
        </Routes>
    )

}

export default AppRoutes;