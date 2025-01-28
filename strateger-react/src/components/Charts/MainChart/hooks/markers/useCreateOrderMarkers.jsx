import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mapOrdersToMarkers, sortAndFilterMarkers as sortAndFilterOrderMarkers } from '../../components/markers/Orders';

const useCreateOrderMarkers = (chartInterval, selectOrders, setOrderMarkers) => {
    const dispatch = useDispatch();

    const orders = useSelector(selectOrders);      

    useEffect(() => {
        let newOrderMarkers = [];
        
        newOrderMarkers = mapOrdersToMarkers(orders, chartInterval);
        
        const sortedOrderMarkers = sortAndFilterOrderMarkers(newOrderMarkers).sort((a, b) => a.time - b.time);
        dispatch(setOrderMarkers(sortedOrderMarkers));
    }, [orders, chartInterval, dispatch, setOrderMarkers]);
}

export default useCreateOrderMarkers;