import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTotalBalanceInUSD } from '../../redux/slices/accountSlice';

const TotalBalanceAccounts = ({ LoadingOverlay }) => {
    const totalBalanceInUSD = useSelector(selectTotalBalanceInUSD);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (totalBalanceInUSD !== null && parseFloat(totalBalanceInUSD) !== 0) {
            setIsLoading(false);
        } else {
            setIsLoading(true);
        }
    }, [totalBalanceInUSD]);

    return (
        <div className="relative mb-1 flex justify-center border-4 border-yellow-500">
            <LoadingOverlay isLoading={isLoading} />
            <h2 className="text-2xl font-bold">
                Total Balance in USD: {totalBalanceInUSD !== null ? totalBalanceInUSD.toFixed(2) : 'Loading...'}
            </h2>
        </div>
    );
};

export default TotalBalanceAccounts;
