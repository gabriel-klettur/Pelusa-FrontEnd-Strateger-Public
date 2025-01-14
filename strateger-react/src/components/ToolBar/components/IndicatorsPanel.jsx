import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { useState } from 'react'

const IndicatorsPanel = () => {

    const [indicators, setIndicators] = useState([]);

    const handleIndicatorClick = (indicator) => {
        setIndicators(indicator);
    }

    return(
        <div className="h-full w-40 bg-african_violet-400 flex justify-center items-center hover:bg-african_violet-600 " >
            <Popover className="relative">
                <PopoverButton>Indicators</PopoverButton>
                <PopoverPanel anchor="bottom" className="absolute z-10 p-4 bg-white border border-african_violet-300 rounded-lg shadow-lg">
                    
                    <button
                        onClick={() => handleIndicatorClick('Stochastic')}
                        className="block w-full text-left hover:bg-african_violet-300 p-2"
                    >
                        Stochastic
                    </button>
                    
                    <button
                        onClick={() => handleIndicatorClick('Emas')}
                        className="block w-full text-left hover:bg-african_violet-300 p-2"
                    >
                        Emas
                    </button>


                    
                </PopoverPanel>
            </Popover>
        </div>
    )
}

export default IndicatorsPanel;