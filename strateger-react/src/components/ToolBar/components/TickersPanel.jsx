import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';

const TickersPanel = ({ currentTicker, setCurrentTicker }) => {
    const handleTickerClick = (ticker, closePopover) => {
        setCurrentTicker(ticker);
        closePopover(); // Cerrar el PopoverPanel después de la acción
    };

    return (
        <div className="h-full w-40 flex justify-center items-center hover:bg-african_violet-600">
            <Popover className="relative w-full h-full">
                {({ close }) => (
                    <>
                        <PopoverButton
                            className="w-full h-full font-semibold text-african_violet-900 hover:text-white transition-colors duration-300"
                        >
                            {currentTicker}
                        </PopoverButton>
                        <PopoverPanel
                            className="absolute w-full bg-african_violet-100/95 shadow-lg rounded-sm z-50"
                        >
                            <button
                                onClick={() => handleTickerClick('BTC-USDT', close)}
                                className="block w-full text-center hover:bg-african_violet-300 p-2 text-african_violet-900"
                            >
                                BTCUSDT
                            </button>

                            <button
                                onClick={() => handleTickerClick('ETH-USDT', close)}
                                className="block w-full text-center hover:bg-african_violet-300 p-2 text-african_violet-900"
                            >
                                ETHUSDT
                            </button>
                        </PopoverPanel>
                    </>
                )}
            </Popover>
        </div>
    );
};

export default TickersPanel;
