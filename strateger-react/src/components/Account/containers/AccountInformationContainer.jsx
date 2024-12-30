
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {fetchTrackRecordBingXAllAccounts, selectTrackRecordAccountsData, selectCoinMTimeData, selectUSDTMTimeData, selectSpotTimeData } from 'reduxStore/account';
import AccountTable from "../components/AccountInformation/AccountTable";

const AccountInformationContainer = () => {
    const dispatch = useDispatch();
    
    // Obtener datos de Redux
    const trackrecordAccountsData = useSelector(selectTrackRecordAccountsData);
    const coinMTimeData = useSelector(selectCoinMTimeData);
    const usdtmTimeData = useSelector(selectUSDTMTimeData);
    const spotTimeData = useSelector(selectSpotTimeData);

    // Obtener estado de carga y error
    const { loading, error } = trackrecordAccountsData;

    // Despachar acción para obtener datos
    useEffect(() => {
        dispatch(fetchTrackRecordBingXAllAccounts());
    }, [dispatch]);

    return (
        <div className="border-4 border-green-500">
            <AccountTable 
                loading={loading} 
                error={error} 
                coinMTimeData={coinMTimeData} 
                usdtmTimeData={usdtmTimeData} 
                spotTimeData={spotTimeData}               
            />
        </div>
    );
    
}

export default AccountInformationContainer;

