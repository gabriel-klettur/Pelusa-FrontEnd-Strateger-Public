import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { mapOrdersToMarkers, sortAndFilterMarkers as sortAndFilterOrderMarkers } from '../components/markers/OrdersChart';
//import { setOrderMarkers } from '../../../../redux/charts';
import { selectFilteredOrdersUsdtm } from '../../../../redux/order';

const useCreateOrderMarkers = (chartInterval) => {
    const dispatch = useDispatch();

    const usdmOrders = useSelector(selectFilteredOrdersUsdtm);  

    useEffect(() => {
        //let newOrderMarkers = [];
        
        //newOrderMarkers = mapOrdersToMarkers(usdmOrders, chartInterval);
        
        //const sortedOrderMarkers = sortAndFilterOrderMarkers(newOrderMarkers).sort((a, b) => a.time - b.time);
        //dispatch(setOrderMarkers(sortedOrderMarkers));
    }, [usdmOrders, chartInterval, dispatch]);

}

export default useCreateOrderMarkers;