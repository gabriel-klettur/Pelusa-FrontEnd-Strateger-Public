//Path: strateger-react/src/components/Alarms/components/AlarmInfoPanel/AlarmsBarChart/components/MonthTogglePanel.jsx

import MonthToggleButton from "./MonthToggleButton";

const MonthTogglePanel = ({monthsLabels, visibleMonths, setVisibleMonths}) => {

    const toggleMonth = (index) => {
        const newVisibleMonths = [...visibleMonths];
        newVisibleMonths[index] = !newVisibleMonths[index];
        setVisibleMonths(newVisibleMonths);
    };

    return (        
        <div data-testid="month-toggle-panel-container">
            <MonthToggleButton 
                monthsLabels={monthsLabels} 
                visibleMonths={visibleMonths} 
                toggleMonth={toggleMonth} 
            />        
        </div>
    );    
}

export default MonthTogglePanel;