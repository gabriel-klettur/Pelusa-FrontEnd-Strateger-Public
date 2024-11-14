

import { useState } from "react";
import ExperimentsArea from "../Components/ExperimentsArea/ExperimentsArea";
import ReadyToUseContainer from "./ReadyToUse/ReadyToUseContainer";
import ExamplesContainer from "./Examples/ExamplesContainer";

const LaboratoryContainer = () => {
    const [showExamples, setShowExamples] = useState(true);
    const [showInLaboratory, setShowinLaboratory] = useState(false);
    const [showReadyToUse, setShowReadyToUse] = useState(false);

    return(
        <div className="flex flex-col bg-white pl-3">
            <div className="flex justify-center mt-3 space-x-2">


                <button
                    onClick={() => {
                        setShowExamples(prevState => !prevState);
                        setShowReadyToUse(false);
                        setShowinLaboratory(false);
                        
                    }}
                    className={`px-2 py-1 bg-purple-500 text-white rounded rounded-xs hover:bg-purple-700 ${showExamples ? 'bg-purple-900' : 'bg-purple-500'}`}
                >
                    Examples
                </button>

                <button
                    onClick={() => {
                        setShowinLaboratory(prevState => !prevState);
                        setShowReadyToUse(false);
                        setShowExamples(false);
                        
                    }}                
                    className={`px-2 py-1 bg-purple-500 text-white rounded rounded-xs hover:bg-purple-700 ${showInLaboratory ? 'bg-purple-900' : 'bg-purple-500'}`}
                >
                    Experiments Area
                </button>

                <button
                    onClick={() => {
                        setShowReadyToUse(prevState => !prevState);
                        setShowExamples(false);
                        setShowinLaboratory(false);
                        
                    }}
                    className={`px-2 py-1 bg-purple-500 text-white rounded rounded-xs hover:bg-purple-700 ${showReadyToUse ? 'bg-purple-900' : 'bg-purple-500'}`}
                >
                    Ready to use
                </button>  
                                              
            </div>

            <hr className="border-t border-gray-300 my-4" />
            
            {showExamples && (
                <ExamplesContainer />
            )}

            {showInLaboratory && (
                <ExperimentsArea />
            )}
            {showReadyToUse && (
                <ReadyToUseContainer />
            )}


        </div>
    )
    
}

export default LaboratoryContainer;