// Path: strateger-react/src/components/Charts/CandlestickChartChart/containers/CandlestickChartContainer.js

const CandlestickChartContainer = ({chartContainerRef}) => {  

    return(
        <div
            ref={chartContainerRef}
            className="h-96 flex-grow rounded-t-lg overflow-hidden border-b-2 border-african_violet-700"
      ></div>    
    )
};

export default CandlestickChartContainer;
