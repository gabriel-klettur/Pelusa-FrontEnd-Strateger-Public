
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
    { name: 'Alarmas',          icon: AlarmsIcon,       route:'/alarms',        disabled: false },
    { name: 'Battle Field',     icon: battleFieldIcon,  route:'/battleField',   disabled: true },
    { name: 'Órdenes',          icon: OrdersIcon,       route:'/Orders',        disabled: true },
    { name: 'Estrategias',      icon: StrategyIcon,     route:'/Strategy',      disabled: true },
    { name: 'Diario',           icon: DiaryIcon,        route:'/Diary',         disabled: true },
    { name: 'Account',          icon: AccountIcon,      route:'/Account',       disabled: true },
    { name: 'Positions',        icon: PositionIcon,     route:'/Position',      disabled: true },
    { name: 'Backtesting',      icon: BacktestingIcon,  route:'/Backtesting',   disabled: true },
    { name: 'Earnings',         icon: EarningsIcon,     route:'/Earnings',      disabled: true },
    { name: 'News',             icon: NewsIcon,         route:'/News',          disabled: true },
    { name: 'Divisas',          icon: DivisasIcon,      route:'/Divisas',       disabled: true },
    { name: 'Reina',            icon: ReinaIcon,        route:'/Share',         disabled: true },
    { name: 'Laboratorio',      icon: LaboratoryIcon,   route:'/Lav',           disabled: true },
    { name: 'Configuración',    icon: ConfigIcon,       route:'/Config',        disabled: true },
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
