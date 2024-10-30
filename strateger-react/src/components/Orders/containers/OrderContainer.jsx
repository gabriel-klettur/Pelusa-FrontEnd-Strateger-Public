
import OrderFiltersPanelContainer from "./OrderFiltersPanelContainer";
import OrderTablesContainer from "./OrderTablesContainer";
import MainChart from "../../Charts/MainChart/MainChart";
import OrdersInfoContainer from "./OrdersInfoContainer";

const OrderContainer = () => {
    return(
        <div className="flex flex-col">
            
            <div className='grid grid-cols-10'>
                <div className='col-span-7'>
                    <MainChart/>
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