//Path: strateger-react/src/components/Alarms/components/AlarmInfoPanel/AlarmsBarChart/components/MonthTogglePanel.jsx

import MonthToggleButton from "Alarms/components/AlarmInfoPanel/AlarmsBarChart/components/MonthToggleButton";

const MonthTogglePanel = ({monthsLabels, visibleMonths, toggleMonth}) => {

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