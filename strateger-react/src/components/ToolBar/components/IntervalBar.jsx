//Path: strateger-react/src/components/ToolBar/components/IntervalBar.jsx


const IntervalBar = ({intervals, buttonClasses, handleIntervalChange }) => {

    return(
        <div className="flex w-full bg-african_violet-300 border-r-4 border-african_violet-500">
            {intervals.map((interval) => (
            <button
                key={interval}
                className={`${buttonClasses(interval)} flex-grow flex-basis-0`}
                onClick={() => handleIntervalChange(interval)}
            >
                {interval}
            </button>
            ))}
        </div>
    );
};

export default IntervalBar;
