// Path: strateger-react/src/components/Account/AccountInformation/AccountInformation.js

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import {fetchAllAccountsData, selectAllAccountsData, selectCoinMTimeData, selectUSDTMTimeData, selectSpotTimeData } from '../../../redux/slices/accountSlice';

import AccountTable from "./AccountTable";

const AccountInformation = ({LoadingOverlay}) => {
    const dispatch = useDispatch();
    
    // Obtener datos de Redux
    const allAccountsData = useSelector(selectAllAccountsData);
    const coinMTimeData = useSelector(selectCoinMTimeData);
    const usdtmTimeData = useSelector(selectUSDTMTimeData);
    const spotTimeData = useSelector(selectSpotTimeData);

    // Obtener estado de carga y error
    const { loading, error } = allAccountsData;

    // Despachar acción para obtener datos
    useEffect(() => {
        dispatch(fetchAllAccountsData());
    }, [dispatch]);

    return (
        <div className="border-4 border-green-500">
            <AccountTable 
                loading={loading} 
                error={error} 
                coinMTimeData={coinMTimeData} 
                usdtmTimeData={usdtmTimeData} 
                spotTimeData={spotTimeData} 
                LoadingOverlay={LoadingOverlay}
            />
        </div>
    );
};

export default AccountInformation;
