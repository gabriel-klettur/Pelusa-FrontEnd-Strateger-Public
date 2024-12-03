const MonthToggleButton = ({allLabels, toggleMonth, visibleMonths}) => {
    return(
        <>
            {allLabels.map((month, index) => (
                <button
                key={month}
                onClick={() => toggleMonth(index)}
                className={`px-2 py-1 h-10 flex items-center justify-center rounded-sm text-african_violet-900 ${
                    visibleMonths[index] ? 'bg-african_violet-500' : 'bg-african_violet-300'
                }`}
                >
                {month}
                </button>
            ))}
        </>
    )
}

export default MonthToggleButton;