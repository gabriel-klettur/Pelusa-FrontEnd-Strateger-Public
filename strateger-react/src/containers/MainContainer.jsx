import NavBarContainer from "./NavBarContainer";
import CandlestickChart from '../components/Charts/CandlestickChartChart/CandlestickChart';
import Reloj from '../components/common/Reloj';
import Toolbar from '../components/ToolBar';

const MainContainer = () => {
  
    return (
        <>      
            <>
                <Toolbar />
            </>              
            <>
                <CandlestickChart />            
            </>
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