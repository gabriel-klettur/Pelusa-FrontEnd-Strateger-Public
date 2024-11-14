import { useState } from "react";

import ChartsExamplesContiner from "./ChartsExamplesContiner";

const ExamplesContainer = () => {

    const [showChartsExamplesContainer, setShowChartsExamplesContainer] = useState(true);


    return(
        <>
            <div className="flex justify-center space-x-2">
                <button
                    onClick={() => {
                        setShowChartsExamplesContainer(prevState => !prevState); 
                    }}
                    className={`px-2 py-1 bg-purple-500 text-white rounded rounded-xs hover:bg-purple-700 ${showChartsExamplesContainer ? 'bg-purple-900' : 'bg-purple-500'}`}
                >
                    Charts Examples
                </button>
            </div>
            
            {showChartsExamplesContainer && (
                <ChartsExamplesContiner />
            )}            

        </>
    )

}

export default ExamplesContainer;