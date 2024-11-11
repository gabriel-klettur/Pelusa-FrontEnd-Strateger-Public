//Path: src/components/configComponent/ConfigComponent.jsx

import { useState } from "react";
import ChartsExamples from "./components/ChartsExamples";
import LaboratoryCharts from "./components/LaboratoryCharts";

const ConfigComponent = () => {

    const [showExamples, setShowExamples] = useState(true);
    const [showInLaboratory, setShowinLaboratory] = useState(false);
    const [showReadyToUse, setShowReadyToUse] = useState(false);

    return(
        <div className="flex flex-col bg-white pl-3">
            <div className="flex justify-center mt-3 space-x-2">
                <button
                    onClick={() => {
                        setShowExamples(prevState => !prevState);
                        
                    }}
                    className={`px-2 py-1 text-white rounded rounded-xs hover:bg-purple-700 ${showExamples ? 'bg-purple-900' : 'bg-purple-500'}`}
                >
                    Examples
                </button>
                <button
                    onClick={() => {
                        setShowinLaboratory(prevState => !prevState);
                        
                    }}                
                    className={`px-2 py-1 bg-purple-500 text-white rounded rounded-xs hover:bg-purple-700 ${showInLaboratory ? 'bg-purple-900' : 'bg-purple-500'}`}
                >
                    In Laboratory
                </button>
                <button
                    onClick={() => {
                        setShowReadyToUse(prevState => !prevState);
                        
                    }}
                    className={`px-2 py-1 bg-purple-500 text-white rounded rounded-xs hover:bg-purple-700 ${showReadyToUse ? 'bg-purple-900' : 'bg-purple-500'}`}
                >
                    Ready to use
                </button>                
            </div>
            {showExamples && (
                <ChartsExamples />
            )}

            {showInLaboratory && (
                <LaboratoryCharts />
            )}
        </div>
    )
}

export default ConfigComponent;