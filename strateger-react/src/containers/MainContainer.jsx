import NavBarContainer from "./NavBarContainer";
import Reloj from '../components/common/Reloj';

const MainContainer = () => {
  
    return (
        <>                  
            <>
                <NavBarContainer />                    
            </>

            <div className="fixed bottom-4 right-20">
                <Reloj direction="up" />
            </div>
        </>
    );
};

export default MainContainer;