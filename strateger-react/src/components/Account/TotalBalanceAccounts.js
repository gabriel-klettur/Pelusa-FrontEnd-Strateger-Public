import { useSelector } from 'react-redux';
import { selectTotalBalanceInUSD } from '../../redux/slices/accountSlice';

const TotalBalanceAccounts = () => {

    const totalBalanceInUSD = useSelector(selectTotalBalanceInUSD);

    return(
        <div className="mb-1 flex justify-center border-4 border-yellow-500">
        <h2 className="text-2xl font-bold">Total Balance in USD: {totalBalanceInUSD !== null ? totalBalanceInUSD.toFixed(2) : 'Loading...'}</h2>
      </div>
    )};

export default TotalBalanceAccounts;