import { useDispatch } from 'react-redux';
import { setSelectedChartTool } from '../../../../redux/interaction/interactionSlice';

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
    { name: 'null',        icon: clickIcon,            disabled: false },    
    { name: 'brush',        icon: brushIcon,            disabled: false },
    { name: 'line',         icon: trendLineIcon,        disabled: false },    
    { name: 'rectangle',    icon: rectangleIcon,        disabled: false },
    { name: 'text',         icon: textIcon,             disabled: false },    
    { name: 'ruler',        icon: rulerIcon,            disabled: false },    
    { name: 'delete',       icon: deleteIcon,           disabled: false },
    { name: 'deleteAll',       icon: deleteAllIcon,        disabled: false },
];

const ChartToolBar = () => {

    const dispatch = useDispatch();

    const handleTabChange = (index) => {
        console.log(`Tab seleccionado: ${tabs[index].name}, disable: ${tabs[index].disabled}`);        
        dispatch(setSelectedChartTool(tabs[index].name));
    };

    return(
        <TabBar            
            handleTabChange={handleTabChange}
            tabs={tabs}
        />
    )    
}

export default ChartToolBar;
