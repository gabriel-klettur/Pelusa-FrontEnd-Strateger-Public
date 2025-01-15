import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { useState } from 'react';
import indicatorsIcon from '../assets/indicators.svg'; // Ajusta la ruta según la estructura de tu proyecto


const IndicatorsPanel = () => {
    const [indicators, setIndicators] = useState([]);

    const handleIndicatorClick = (indicator, closePopover) => {
        setIndicators(indicator);
        closePopover(); // Cerrar el Popover después de seleccionar un indicador
    };

    return (
        <div className="h-full w-40 flex justify-center items-center">
            <Popover className="relative h-full w-full">
                {({ close }) => (
                    <>
                        <PopoverButton
                            className="h-full w-full flex justify-center items-center gap-2 px-2 font-semibold text-african_violet-900 bg-transparent hover:bg-african_violet-600 hover:text-white transition-colors duration-300 rounded-sm"
                        >
                            <img
                                src={indicatorsIcon}
                                alt="Indicators Icon"
                                className="w-8 h-8"
                            />
                            <span className="leading-none">Indicators</span>
                        </PopoverButton>
                        <PopoverPanel
                            className="absolute w-full bg-african_violet-100/95 shadow-lg rounded-sm z-50"
                        >
                            <button
                                onClick={() => handleIndicatorClick('Stochastic', close)}
                                className="block w-full text-center hover:bg-african_violet-300 p-2 text-african_violet-900"
                            >
                                Stochastic
                            </button>
                            <button
                                onClick={() => handleIndicatorClick('Emas', close)}
                                className="block w-full text-center hover:bg-african_violet-300 p-2 text-african_violet-900"
                            >
                                Emas
                            </button>
                        </PopoverPanel>
                    </>
                )}
            </Popover>
        </div>
    );
};

export default IndicatorsPanel;
