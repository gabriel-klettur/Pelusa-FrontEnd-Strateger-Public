import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { useState } from 'react';
import indicatorsIcon from '../../../assets/indicators.svg';
import ActionButton from './ActionButton';

const IndicatorsPanel = () => {
    const [ setIndicators] = useState([]);

    const handleIndicatorClick = (indicator, closePopover) => {
        setIndicators(indicator);
        closePopover();
    };

    return (
        <div className="h-full w-40 flex justify-center items-center">
            <Popover className="relative h-full w-full">
                {({ close }) => (
                    <>
                        <PopoverButton
                            className="h-full w-full flex justify-center items-center gap-2 px-2 font-semibold text-african_violet-900 bg-transparent hover:bg-african_violet-600 hover:text-white transition-colors duration-300 rounded-sm"
                        >
                            <img src={indicatorsIcon} alt="Indicators Icon" className="w-8 h-8" />
                            <span>Indicators</span>
                        </PopoverButton>
                        <PopoverPanel className="absolute w-full bg-african_violet-100/95 shadow-lg rounded-sm z-50">
                            <ActionButton
                                text="Stochastic"
                                onClick={() => handleIndicatorClick('Stochastic', close)}
                                className="block w-full text-center hover:bg-african_violet-300 p-2 text-african_violet-900"
                            />
                            <ActionButton
                                text="Emas"
                                onClick={() => handleIndicatorClick('Emas', close)}
                                className="block w-full text-center hover:bg-african_violet-300 p-2 text-african_violet-900"
                            />
                        </PopoverPanel>
                    </>
                )}
            </Popover>
        </div>
    );
};

export default IndicatorsPanel;
