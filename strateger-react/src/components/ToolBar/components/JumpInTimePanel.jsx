//Path: strateger-react/src/components/ToolBar/components/JumpInTimePanel.jsx

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { useRef, useState } from 'react';

const JumpInTimePanel = ({jumpToDate, setJumpToDate }) => {
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

    const handleOkClick = () => {
        if (validateInputs()) {
            const dateTime = new Date(`${year}-${month}-${day}T${hour}:${minute}:00Z`);
            const formattedDate = dateTime.toISOString();
            setJumpToDate(formattedDate);
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
        <div className="h-full w-96 flex justify-center items-center hover:bg-african_violet-600">
            <Popover className="relative w-full h-full">
                <PopoverButton
                    className="w-full h-full font-semibold text-african_violet-900 hover:text-white transition-colors duration-300 "                    
                >
                    {jumpToDate
                        ? new Date(jumpToDate).toISOString().slice(0, 10)
                        : 'Jump To Date'
                    }
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
                                    className="w-16 p-2 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-african_violet-500"
                                />
                            ))}
                        </div>
                        <div className="flex gap-2 justify-center">
                            <button
                                onClick={handleOkClick}
                                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                            >
                                GO
                            </button>
                            <button
                                onClick={handleCurrentDateClick}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                CurrentDate
                            </button>
                            <button
                                onClick={handleClearClick}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                            >
                                CLEAR
                            </button>
                        </div>
                    </div>
                </PopoverPanel>
            </Popover>
        </div>
    );
};

export default JumpInTimePanel;
