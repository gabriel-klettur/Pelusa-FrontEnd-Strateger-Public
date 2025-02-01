import TabBar from '../../../common/TabBar';


import clickIcon from '../../assets/touch_app.svg';
import deleteIcon from '../../assets/delete.svg';
import rulerIcon from '../../assets/ruler.svg';
import rectangleIcon from '../../assets/rectangle.svg';
import textIcon from '../../assets/text.svg';
import brushIcon from '../../assets/brush.svg';
import trendLineIcon from '../../assets/trend_line.svg';


const tabs= [
    { name: 'Click',        icon: clickIcon,        disabled: false },
    { name: 'Delete',       icon: deleteIcon,       disabled: false },
    { name: 'Ruler',        icon: rulerIcon,        disabled: false },
    { name: 'Rectangle',    icon: rectangleIcon,    disabled: false },
    { name: 'Text',         icon: textIcon,         disabled: false },
    { name: 'Brush',        icon: brushIcon,        disabled: false },
    { name: 'Trend Line',   icon: trendLineIcon,    disabled: false },
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
