import TabBar from '../../../common/TabBar';


import clickIcon from '../../assets/touch_app.svg';
import deleteIcon from '../../assets/delete.svg';
import deleteAllIcon from '../../assets/delete_all.svg';
import rulerIcon from '../../assets/ruler.svg';
import rectangleIcon from '../../assets/rectangle.svg';
import textIcon from '../../assets/text.svg';
import brushIcon from '../../assets/brush.svg';
import trendLineIcon from '../../assets/trend_line.svg';


const tabs= [
    { name: 'Click',        icon: clickIcon,            disabled: false },    
    { name: 'brush',        icon: brushIcon,            disabled: false },
    { name: 'line',         icon: trendLineIcon,        disabled: false },    
    { name: 'rectangle',    icon: rectangleIcon,        disabled: false },
    { name: 'text',         icon: textIcon,             disabled: false },    
    { name: 'ruler',        icon: rulerIcon,            disabled: false },    
    { name: 'delete',       icon: deleteIcon,           disabled: false },
    { name: 'delete',       icon: deleteAllIcon,        disabled: false },
];

const ChartToolBar = () => {

    const handleTabChange = (index) => {
        console.log(index);
    };

    return(
        <TabBar
            selectedTab={0}
            handleTabChange={handleTabChange}
            tabs={tabs}
        />
    )    
}

export default ChartToolBar;
