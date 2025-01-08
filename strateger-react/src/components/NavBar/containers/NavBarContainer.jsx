
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedTab, selectSelectedTab } from 'reduxStore/tab/tabSlice';

// Import the NavBar component
import NavBar from '../components/NavBar';

// Import or define your images
import battleFieldIcon from '../assets/icons/battleField.svg';
import AlarmsIcon from '../assets/icons/alarms.svg';
import OrdersIcon from '../assets/icons/orders.svg';
import StrategyIcon from '../assets/icons/strategy.svg';
import DiaryIcon from '../assets/icons/diary.svg';
import AccountIcon from '../assets/icons/account.svg';
import PositionIcon from '../assets/icons/positions.svg';
import BacktestingIcon from '../assets/icons/backtesting.svg';
import ConfigIcon from '../assets/icons/config.svg'; 
import NewsIcon from '../assets/icons/news.svg'; 
import EarningsIcon from '../assets/icons/earnings.svg'; 
import DivisasIcon from '../assets/icons/divisas.svg';
import ReinaIcon from '../assets/icons/reina.svg';
import LaboratoryIcon from '../assets/icons/lab.svg';

// Define the tabs and their corresponding icons
const tabs = [    
    { name: 'Alarmas',          icon: AlarmsIcon,       route:'/pelusa-trader/alarms',        disabled: false },
    { name: 'Estrategias',      icon: StrategyIcon,     route:'/pelusa-trader/Strategy',      disabled: true },
    { name: 'Battle Field',     icon: battleFieldIcon,  route:'/pelusa-trader/battleField',   disabled: true },
    { name: 'Órdenes',          icon: OrdersIcon,       route:'/pelusa-trader/Orders',        disabled: true },    
    { name: 'Diario',           icon: DiaryIcon,        route:'/pelusa-trader/Diary',         disabled: true },
    { name: 'Account',          icon: AccountIcon,      route:'/pelusa-trader/Account',       disabled: true },
    { name: 'Positions',        icon: PositionIcon,     route:'/pelusa-trader/Position',      disabled: true },
    { name: 'Backtesting',      icon: BacktestingIcon,  route:'/pelusa-trader/Backtesting',   disabled: true },
    { name: 'Earnings',         icon: EarningsIcon,     route:'/pelusa-trader/Earnings',      disabled: true },
    { name: 'News',             icon: NewsIcon,         route:'/pelusa-trader/News',          disabled: true },
    { name: 'Divisas',          icon: DivisasIcon,      route:'/pelusa-trader/Divisas',       disabled: true },
    { name: 'Reina',            icon: ReinaIcon,        route:'/pelusa-trader/Share',         disabled: true },
    { name: 'Laboratorio',      icon: LaboratoryIcon,   route:'/pelusa-trader/Lav',           disabled: true },
    { name: 'Configuración',    icon: ConfigIcon,       route:'/pelusa-trader/Config',        disabled: true },
];

const NavBarContainer = () => {
    const dispatch = useDispatch();
    const selectedTab = useSelector(selectSelectedTab);
    const navigate = useNavigate();

    const handleTabChange = (index) => {
        if (!tabs[index].disabled) {
          dispatch(setSelectedTab(index));
          navigate(tabs[index].route); // Navegar directamente
        }
    };

    return (
      <>
        <NavBar
            selectedTab={selectedTab}
            handleTabChange={handleTabChange}
            tabs={tabs}
        />  
      </>
    );
};

export default NavBarContainer;
