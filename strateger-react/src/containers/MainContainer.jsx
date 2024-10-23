
import Toolbar from "../components/ToolBar/Toolbar";
import NavBarContainer from "../components/NavBar/containers/NavBarContainer";
import Reloj from '../components/common/Reloj';
const MainContainer = () => {
  
    return (
        <div className="h-max-screen">
            <>
                <Toolbar/>  
            </>           
            <>
                <NavBarContainer />                    
            </>

            <div className="fixed bottom-4 right-20">
                <Reloj direction="up" />
            </div>
        </div>
    );
};

export default MainContainer;