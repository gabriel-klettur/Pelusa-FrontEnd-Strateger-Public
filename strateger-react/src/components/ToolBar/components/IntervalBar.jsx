//Path: strateger-react/src/components/ToolBar/components/IntervalBar.jsx


const IntervalBar = ({intervals, currentInterval, handleIntervalChange }) => {

    const buttonClasses = (interval) =>
        `px-6 font-semibold transition-colors duration-300 ${
          currentInterval === interval
            ? 'bg-african_violet-500 text-white'
            : 'bg-african_violet-300 text-african_violet-900 hover:bg-african_violet-400'
        }`;

    return(
        <div className="flex w-full bg-african_violet-300">
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
