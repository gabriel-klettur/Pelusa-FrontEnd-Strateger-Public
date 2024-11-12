import VerticalBarChartV2 from '../../common/charts/VerticalBarChartV2';
import Ventanita from '../../common/Ventanita';

const LaboratoryCharts = () => {
    return(
        <div className="flex flex-col mt-2">
            <div className='h-32'>
                <Ventanita
                    titulo='For Alarms'
                    contenido={
                        <VerticalBarChartV2 />
                    }
                />
            </div>
        </div>
    )
}

export default LaboratoryCharts;