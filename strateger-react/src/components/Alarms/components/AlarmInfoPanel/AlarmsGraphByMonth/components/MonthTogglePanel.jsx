//Path: strateger-react/src/components/Alarms/components/AlarmInfoPanel/AlarmsGraphByMonth/components/MonthTogglePanel.jsx

import MonthToggleButton from "./MonthToggleButton";

const MonthTogglePanel = ({allLabels, visibleMonths, setVisibleMonths}) => {

    const toggleMonth = (index) => {
        const newVisibleMonths = [...visibleMonths];
        newVisibleMonths[index] = !newVisibleMonths[index];
        setVisibleMonths(newVisibleMonths);
    };

    return (        
        <div data-testid="month-toggle-panel-container">
            <MonthToggleButton 
                allLabels={allLabels} 
                visibleMonths={visibleMonths} 
                toggleMonth={toggleMonth} 
            />        
        </div>
    );    
}

export default MonthTogglePanel;