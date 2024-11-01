
import { useSelector } from 'react-redux';
import { selectTotalBalanceInUSD } from '../../../redux/account';

const TotalBalanceAccounts = () => {
    const totalBalanceInUSD = useSelector(selectTotalBalanceInUSD);    

    return (
        <div className="relative pt-1 flex justify-center bg-african_violet-200">            
            <h2 className="text-2xl font-bold text-white">
                Total Balance in USD: {totalBalanceInUSD !== null ? totalBalanceInUSD.toFixed(2) : 'Loading...'}
            </h2>
        </div>
    );
};

export default TotalBalanceAccounts;
