import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { useRef, useState } from 'react';

const JumpInTimePanel = ({ jumpToDate, setJumpToDate }) => {
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [hour, setHour] = useState('');
    const [minute, setMinute] = useState('');

    const monthRef = useRef(null);
    const dayRef = useRef(null);
    const hourRef = useRef(null);
    const minuteRef = useRef(null);

    const handleInputChange = (value, setter, maxLength, nextRef) => {
        if (value.length > maxLength) {
            setter(value.slice(0, maxLength));
            if (nextRef?.current) nextRef.current.focus();
        } else {
            setter(value);
        }
    };

    const handleKeyDown = (event, value, setter, prevRef) => {
        if (event.key === 'Backspace' && value.length === 0 && prevRef?.current) {
            prevRef.current.focus();
        }
    };

    const handleOkClick = (closePopover) => {
        if (validateInputs()) {
            const dateTime = new Date(`${year}-${month}-${day}T${hour}:${minute}:00Z`);
            const formattedDate = dateTime.toISOString();
            setJumpToDate(formattedDate);
            closePopover(); // Cerrar el PopoverPanel
        } else {
            alert('Please ensure all fields are filled correctly.');
        }
    };

    const handleClearClick = () => {
        setYear('');
        setMonth('');
        setDay('');
        setHour('');
        setMinute('');
    };

    const handleCurrentDateClick = () => {
        const now = new Date();
        setYear(now.getFullYear().toString());
        setMonth(String(now.getMonth() + 1).padStart(2, '0'));
        setDay(String(now.getDate()).padStart(2, '0'));
        setHour(String(now.getHours()).padStart(2, '0'));
        setMinute(String(now.getMinutes()).padStart(2, '0'));
    };

    const validateInputs = () => {
        const isValidYear = /^\d{4}$/.test(year);
        const isValidMonth = /^\d{2}$/.test(month) && +month >= 1 && +month <= 12;
        const isValidDay = /^\d{2}$/.test(day) && +day >= 1 && +day <= 31;
        const isValidHour = /^\d{2}$/.test(hour) && +hour >= 0 && +hour <= 23;
        const isValidMinute = /^\d{2}$/.test(minute) && +minute >= 0 && +minute <= 59;

        return isValidYear && isValidMonth && isValidDay && isValidHour && isValidMinute;
    };

    const fieldsConfig = [
        { placeholder: 'YYYY', value: year, setter: setYear, maxLength: 4, nextRef: monthRef },
        { placeholder: 'MM', value: month, setter: setMonth, maxLength: 2, nextRef: dayRef, ref: monthRef },
        { placeholder: 'DD', value: day, setter: setDay, maxLength: 2, nextRef: hourRef, ref: dayRef },
        { placeholder: 'HH', value: hour, setter: setHour, maxLength: 2, nextRef: minuteRef, ref: hourRef },
        { placeholder: 'mm', value: minute, setter: setMinute, maxLength: 2, ref: minuteRef },
    ];

    return (
        <div className="h-full w-96 flex justify-center items-center">
            <Popover className="relative w-full h-full">
                {({ close }) => (
                    <>
                        <PopoverButton
                            className="w-full h-full font-semibold text-african_violet-900 bg-transparent hover:bg-african_violet-600 hover:text-white transition-colors duration-300 rounded-sm"
                        >
                            {jumpToDate
                                ? new Date(jumpToDate).toISOString().slice(0, 10)
                                : 'Jump To Date'}
                        </PopoverButton>
                        <PopoverPanel
                            anchor="bottom"
                            className="absolute p-4 w-96 bg-african_violet-100/95 shadow-lg rounded-sm space-y-4 z-50"
                        >
                            <div className="flex flex-col gap-4">
                                <div className="flex gap-2">
                                    {fieldsConfig.map(({ placeholder, value, setter, maxLength, nextRef, ref }, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            placeholder={placeholder}
                                            value={value}
                                            onChange={(e) => handleInputChange(e.target.value, setter, maxLength, nextRef)}
                                            onKeyDown={(e) => handleKeyDown(e, value, setter, ref)}
                                            ref={ref}
                                            className="w-16 p-2 border-2 border-gray-400 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-african_violet-500 focus:border-african_violet-500 hover:border-african_violet-400 transition-all duration-200 text-center"                                    
                                        />
                                    ))}
                                </div>
                                <div className="flex gap-2 justify-center">
                                    <button
                                        onClick={() => handleOkClick(close)}
                                        className="px-5 py-2 border-2 border-green-500 text-green-500 rounded-md hover:bg-green-500 hover:text-white transition-colors duration-200"
                                    >
                                        GO
                                    </button>
                                    <button
                                        onClick={handleCurrentDateClick}
                                        className="px-5 py-2 border-2 border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition-colors duration-200"
                                    >
                                        CurrentDate
                                    </button>
                                    <button
                                        onClick={handleClearClick}
                                        className="px-5 py-2 border-2 border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition-colors duration-200"
                                    >
                                        CLEAR
                                    </button>
                                </div>
                            </div>
                        </PopoverPanel>
                    </>
                )}
            </Popover>
        </div>
    );
};

export default JumpInTimePanel;
