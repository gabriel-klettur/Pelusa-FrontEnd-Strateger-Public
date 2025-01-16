import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import searchIcon from '../assets/search.svg';
import ActionButton from './ActionButton';

const TickersPanel = ({ currentTicker, setCurrentTicker }) => {
    const handleTickerClick = (ticker, closePopover) => {
        setCurrentTicker(ticker);
        closePopover();
    };

    return (
        <div className="h-full w-40 flex justify-center items-center">
            <Popover className="relative w-full h-full">
                {({ close }) => (
                    <>
                        <PopoverButton
                            className="h-full w-full flex justify-center items-center gap-2 px-2 font-semibold text-african_violet-900 bg-transparent hover:bg-african_violet-600 hover:text-white transition-colors duration-300 rounded-sm"
                        >
                            <img src={searchIcon} alt="Search Icon" className="w-5 h-5" />
                            <span>{currentTicker}</span>
                        </PopoverButton>
                        <PopoverPanel className="absolute w-full bg-african_violet-100/95 shadow-lg rounded-sm z-50">
                            <ActionButton
                                text="BTCUSDT"
                                onClick={() => handleTickerClick('BTC-USDT', close)}
                                className="block w-full text-center hover:bg-african_violet-300 p-2 text-african_violet-900"
                            />
                            <ActionButton
                                text="ETHUSDT"
                                onClick={() => handleTickerClick('ETH-USDT', close)}
                                className="block w-full text-center hover:bg-african_violet-300 p-2 text-african_violet-900"
                            />
                        </PopoverPanel>
                    </>
                )}
            </Popover>
        </div>
    );
};

export default TickersPanel;
