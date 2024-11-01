// Path: strateger-react/src/components/Account/AccountInformation/AccountInformation.js

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import {fetchTrackRecordBingXAllAccounts, selectTrackRecordAccountsData, selectCoinMTimeData, selectUSDTMTimeData, selectSpotTimeData } from '../../../../redux/account';

import AccountTable from "./AccountTable";

const AccountInformation = () => {
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
};

export default AccountInformation;