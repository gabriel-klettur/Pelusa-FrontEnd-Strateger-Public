
import PerpUSDTMChart from './PerpUSDTMChart';
import SpotChart from './SpotChart';
import PerpCOINMChart from './PerpCOINMChart';

const AccountCharts = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
    <div className="border-4 border-red-500">
      <PerpUSDTMChart />
    </div>
    <div className="border-4 border-red-500">
      <SpotChart />
    </div>
    <div className="border-4 border-red-500">
      <PerpCOINMChart />
    </div>
  </div>
  );
}

export default AccountCharts;