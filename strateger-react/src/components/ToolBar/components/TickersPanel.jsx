import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'

const TickersPanel = ({currentTicker, setCurrentTicker}) => {
    
    const handleTickerClick = (ticker) => {
        setCurrentTicker(ticker);
    }

    return(
        <div className="h-full w-40 bg-african_violet-400 flex justify-center items-center hover:bg-african_violet-600 " >
            <Popover className="relative">
                <PopoverButton
                    className="font-semibold text-african_violet-900 hover:text-white transition-colors duration-300"
                >
                    {currentTicker}
                </PopoverButton>
                <PopoverPanel anchor="bottom" className="mt-4 absolute w-40 bg-african_violet-100/95 shadow-lg rounded-sm p-4 space-y-4 z-50">                    
                    <button
                        onClick={() => handleTickerClick('BTC-USDT')}
                        className="block w-full text-left hover:bg-african_violet-300 p-2 text-african_violet-900"
                    >
                        BTCUSDT
                    </button>
                    
                    <button
                        onClick={() => handleTickerClick('ETH-USDT')}
                        className="block w-full text-left hover:bg-african_violet-300 p-2 text-african_violet-900"
                    >
                        ETHUSDT
                    </button>                    
                </PopoverPanel>
            </Popover>
        </div>
    )
}

export default TickersPanel;