import AlarmInfoChart from '../../Alarms/components/AlarmInfoPanel/AlarmInfoChart';
import Ventanita from '../../common/Ventanita';

const LaboratoryCharts = () => {
    return(
        <div className="flex flex-col mt-2">
            <div className='h-32'>
                <Ventanita
                    titulo='For Alarms'
                    contenido={
                        <AlarmInfoChart />
                    }
                />
            </div>
        </div>
    )
}

export default LaboratoryCharts;