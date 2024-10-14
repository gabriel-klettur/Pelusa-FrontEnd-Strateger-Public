import IntervalButton from "./IntervalButton";

const IntervalBar = ({temporalidades, selectedTemporalidad, selectedTypes, toggleTemporalidad}) => {
    return (
        <div className="flex flex-nowrap justify-center items-center bg-african_violet-300 text-pomp_and_power-400">
            {temporalidades.map((temp) => (
            <IntervalButton
                key={temp}
                temporalidad={temp}
                selectedTemporalidad={selectedTemporalidad}
                selectedIntervalAndTypes={selectedTypes}            
                toggleTemporalidad={toggleTemporalidad}
            />
            ))}
        </div>
    )
}


export default IntervalBar;