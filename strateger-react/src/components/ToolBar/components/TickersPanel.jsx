import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'

const TickersPanel = ({currentTicker, setCurrentTicker}) => {
    
    const handleTickerClick = (ticker) => {
        setCurrentTicker(ticker);
    }

    return(
        <div className="h-full w-40 bg-african_violet-400 flex justify-center items-center hover:bg-african_violet-600 " >
            <Popover className="relative">
                <PopoverButton>{currentTicker}</PopoverButton>
                <PopoverPanel anchor="bottom" className="absolute z-10 p-4 bg-white border border-african_violet-300 rounded-lg shadow-lg">
                    
                    <button
                        onClick={() => handleTickerClick('BTCUSD.PS')}
                        className="block w-full text-left hover:bg-african_violet-300 p-2"
                    >
                        BTCUSDT
                    </button>
                    
                    <button
                        onClick={() => handleTickerClick('ETHUSDT.PS')}
                        className="block w-full text-left hover:bg-african_violet-300 p-2"
                    >
                        ETHUSDT
                    </button>


                    
                </PopoverPanel>
            </Popover>
        </div>
    )
}

export default TickersPanel;