import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchOrdersStandard } from 'reduxStore/order';
import { selectOrderStandard, setErrorStandard } from 'reduxStore/order';

const useFetchOrdersStandard = () => {
    const dispatch = useDispatch();
    const data = useSelector(selectOrderStandard);
        
    useEffect(() => {    
        if (data.length === 0){
            try {
                dispatch(fetchOrdersStandard({ limit: 500, offset: 0 }));    
            } catch (error) {
                setErrorStandard(error);    
            }        
        }
    }, [dispatch, data.length]);
}

export default useFetchOrdersStandard;