import { Outlet } from "react-router-dom";

import Toolbar from "../components/ToolBar/Toolbar";
import NavBarContainer from "../components/NavBar/containers/NavBarContainer";
import Reloj from '../components/common/Reloj';

const MainContainer = () => {
    return (
        <div className="h-screen"> 
            <Toolbar />
            <div className="flex flex-1"> 
                <div className="flex-1"> 
                    <Outlet />
                </div>
                <div className="w-12">
                    <NavBarContainer />
                </div>
            </div>
            <div className="fixed bottom-4 right-20">
                <Reloj direction="up" />
            </div>
        </div>
    );
};

export default MainContainer;
