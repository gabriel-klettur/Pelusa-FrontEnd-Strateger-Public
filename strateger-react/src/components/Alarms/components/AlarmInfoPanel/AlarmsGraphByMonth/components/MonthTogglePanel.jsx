import MonthToggleButton from "./MonthToggleButton";

const MonthTogglePanel = ({allLabels, visibleMonths, setVisibleMonths}) => {

    const toggleMonth = (index) => {
        const newVisibleMonths = [...visibleMonths];
        newVisibleMonths[index] = !newVisibleMonths[index];
        setVisibleMonths(newVisibleMonths);
    };

    return (
        <div className="grid grid-cols-6 gap-2 justify-center text-sm rounded-sm">
        
            <MonthToggleButton 
                allLabels={allLabels} 
                visibleMonths={visibleMonths} 
                toggleMonth={toggleMonth} 
            />

        </div>
    );    
}

export default MonthTogglePanel;