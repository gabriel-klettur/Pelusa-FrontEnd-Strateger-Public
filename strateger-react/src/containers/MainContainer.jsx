
import NavBarContainer from "./NavBarContainer";
import LightweightChart from '../components/Charts/BarChart/BarChart';
import Reloj from '../components/common/Reloj';

const MainContainer = () => {

  
    //! ----------------- Chart Settings -----------------
    const initialTemporalidad = '1d'; // Define el intervalo inicial como '1d'

    // Obtener la fecha actual y formatearla
    const currentDate = new Date();
    const formattedCurrentDate = currentDate.toISOString();    

    // Calcular la fecha de inicio (1000 días antes de la fecha actual)
    const startDate = new Date();
    startDate.setDate(currentDate.getDate() - 1000);
    const formattedStartDate = startDate.toISOString();

    //!-----------------------------------------------------

    return (
        <>                    
            <>
                <LightweightChart
                    initialTemporalidad={initialTemporalidad}
                    initialStartDate={formattedStartDate}
                    initialEndDate={formattedCurrentDate}
                />            
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