const MonthToggleButton = ({monthsLabels, toggleMonth, visibleMonths}) => {
    return(        
        <div className="grid grid-cols-6 gap-1 justify-center text-sm rounded-sm"
            data-testid="month-toggle-button-container">
            {monthsLabels.map((month, index) => (
                <button
                    key={index}
                    onClick={() => toggleMonth(index)}
                    data-testid={`month-button-${index}`}
                    className={`px-2 py-1 h-10 flex items-center justify-center rounded-sm text-african_violet-900 hover:bg-african_violet-400
                        ${
                            visibleMonths[index] ? 'bg-african_violet-500' : 'bg-african_violet-300'
                        }`
                    }
                >
                    {month}
                </button>
            ))}
        </div>
    )
}

export default MonthToggleButton;