import { Outlet } from "react-router-dom";

import Toolbar from "../components/ToolBar/Toolbar";
import NavBarContainer from "../components/NavBar/containers/NavBarContainer";

const MainContainer = () => {
    return (
        <div className="h-screen bg-african_violet-700"> 
            <Toolbar />
            <div className="flex flex-1"> 
                <div className="flex-1"> 
                    <Outlet />
                </div>
                <div className="w-12 mt-1 bg-african_violet-300">
                    <NavBarContainer />
                </div>
            </div>
        </div>
    );
};

export default MainContainer;
