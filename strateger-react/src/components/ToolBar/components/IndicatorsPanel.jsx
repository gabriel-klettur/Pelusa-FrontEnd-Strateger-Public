import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { useState } from 'react'

const IndicatorsPanel = () => {

    const [indicators, setIndicators] = useState([]);

    const handleIndicatorClick = (indicator) => {
        setIndicators(indicator);
    }

    return(
        <div className="h-full w-40 flex justify-center items-center hover:bg-african_violet-600 " >
            <Popover className="relative h-full w-full">
                <PopoverButton
                        className="h-full w-full font-semibold text-african_violet-900 hover:text-white transition-colors duration-300"
                >
                    Indicators
                </PopoverButton>
                <PopoverPanel anchor="bottom" className="absolute w-40  bg-african_violet-100/95 shadow-lg rounded-sm p-4 space-y-4 z-50">
                    
                    <button
                        onClick={() => handleIndicatorClick('Stochastic')}
                        className="block w-full text-left hover:bg-african_violet-300 p-2 text-african_violet-900"
                    >
                        Stochastic
                    </button>
                    
                    <button
                        onClick={() => handleIndicatorClick('Emas')}
                        className="block w-full text-left hover:bg-african_violet-300 p-2 text-african_violet-900"
                    >
                        Emas
                    </button>


                    
                </PopoverPanel>
            </Popover>
        </div>
    )
}

export default IndicatorsPanel;