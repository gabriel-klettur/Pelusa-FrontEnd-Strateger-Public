import { useShowButtonsPanel } from 'Alarms/hooks/useShowButtonsPanel';
import MainChart from '../../Charts/MainChart/MainChart';
import OrdersInfoContainer from './OrdersInfoContainer';
import OrderFiltersPanelContainer from './OrderFiltersPanelContainer';
import OrderTablesContainer from './OrderTablesContainer';

const OrderContainer = () => {
    const { showButtonsPanel } = useShowButtonsPanel({
        showChartsButtonsPanel: false,
        showAlarmsButtonsPanel: false,
        showOrdersButtonsPanel: true,
    });
    return(
        <div className="flex flex-col">
            
            <div className='grid grid-cols-10'>
                <div className='col-span-7'>
                    <MainChart showButtonsPanel={showButtonsPanel} />
                </div>
                <div className='flex flex-col h-full col-span-3'>
                    <OrdersInfoContainer/>
                    <OrderFiltersPanelContainer />               
                </div>
            </div>
            <OrderTablesContainer />
        </div>
    )
}

export default OrderContainer;