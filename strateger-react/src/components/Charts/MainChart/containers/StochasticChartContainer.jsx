const stochasticChartContainer = ({stochasticChartContainerRef}) => {

    return(
        <div
            ref={stochasticChartContainerRef}
            className="h-32 flex-grow mt-2 rounded-b-lg overflow-hidden border-t-1 border-african_violet-700 mr-3"
        ></div>  
    )
}

export default stochasticChartContainer;