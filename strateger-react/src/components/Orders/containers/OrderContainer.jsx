
import OrderFiltersPanelContainer from "./OrderFiltersPanelContainer";
import OrderTablesContainer from "./OrderTablesContainer";
import Toolbar from "../../ToolBar/Toolbar";
import CandlestickChart from "../../Charts/CandlestickChartChart/CandlestickChart";
import OrdersInfoContainer from "./OrdersInfoContainer";

const OrderContainer = () => {
    return(
        <div className="flex flex-col">
            <Toolbar/>
            <div className='grid grid-cols-10'>
                <div className='col-span-7'>
                    <CandlestickChart/>
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