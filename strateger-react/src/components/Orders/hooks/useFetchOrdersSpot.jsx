import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchOrdersSpot } from '../../../redux/order';
import { selectOrderSpot, setErrorSpot } from '../../../redux/order';

const useFetchOrdersSpot = () => {
    const dispatch = useDispatch();
    const data = useSelector(selectOrderSpot);
        
    useEffect(() => {    
        if (data.length === 0){
            try {
                dispatch(fetchOrdersSpot({ limit: 500, offset: 0 }));    
            } catch (error) {
                setErrorSpot(error);    
            }        
        }
    }, [dispatch, data.length]);
}

export default useFetchOrdersSpot;