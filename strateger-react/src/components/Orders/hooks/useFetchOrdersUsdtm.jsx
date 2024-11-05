
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchOrdersUsdtm } from '../../../redux/order';
import { selectOrderUsdtm, setErrorUsdm } from '../../../redux/order';

const useFetchOrdersUsdtm= () => {
    const dispatch = useDispatch();
    const data = useSelector(selectOrderUsdtm);
        
    useEffect(() => {    
        if (data.length === 0){
            try {
                dispatch(fetchOrdersUsdtm({ limit: 500, offset: 0 }));    
            } catch (error) {
                setErrorUsdm(error);    
            }        
        }
    }, [dispatch, data.length]);

}

export default useFetchOrdersUsdtm;