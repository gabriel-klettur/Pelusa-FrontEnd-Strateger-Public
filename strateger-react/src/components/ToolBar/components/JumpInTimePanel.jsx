import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { useRef, useState, useEffect } from 'react';

const JumpInTimePanel = ({ setJumpToDate }) => {
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [hour, setHour] = useState('');
    const [minute, setMinute] = useState('');
    const [currentDate, setCurrentDate] = useState(''); // Estado para almacenar la fecha actual

    const monthRef = useRef(null);
    const dayRef = useRef(null);
    const hourRef = useRef(null);
    const minuteRef = useRef(null);

    useEffect(() => {
        // Obtener la fecha actual al cargar el componente
        const now = new Date();
        const formattedDate = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')}`;
        setCurrentDate(formattedDate); // Actualizar el estado con la fecha formateada
    }, []);

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
            const dateTime = `${year}/${month}/${day} - ${hour}:${minute}`;
            setJumpToDate(dateTime);
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

    return (
        <div className="h-full w-80 flex justify-center items-center hover:bg-african_violet-600">
            <Popover className="relative">
                <PopoverButton
                    className="font-semibold text-african_violet-900 hover:text-white transition-colors duration-300"                    
                >
                    {currentDate || 'Jump To Date'}
                </PopoverButton>
                <PopoverPanel 
                    anchor="bottom" 
                    className="absolute p-4 w-80 mt-4 bg-african_violet-100/95 shadow-lg rounded-sm space-y-4 z-50"
                >
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="YYYY"
                                value={year}
                                onChange={(e) => handleInputChange(e.target.value, setYear, 4, monthRef)}
                                onKeyDown={(e) => handleKeyDown(e, year, setYear, null)}
                                className="w-16 p-2 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-african_violet-500"
                            />
                            <input
                                type="text"
                                placeholder="MM"
                                value={month}
                                onChange={(e) => handleInputChange(e.target.value, setMonth, 2, dayRef)}
                                onKeyDown={(e) => handleKeyDown(e, month, setMonth, monthRef)}
                                ref={monthRef}
                                className="w-12 p-2 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-african_violet-500"
                            />
                            <input
                                type="text"
                                placeholder="DD"
                                value={day}
                                onChange={(e) => handleInputChange(e.target.value, setDay, 2, hourRef)}
                                onKeyDown={(e) => handleKeyDown(e, day, setDay, monthRef)}
                                ref={dayRef}
                                className="w-12 p-2 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-african_violet-500"
                            />
                            <input
                                type="text"
                                placeholder="HH"
                                value={hour}
                                onChange={(e) => handleInputChange(e.target.value, setHour, 2, minuteRef)}
                                onKeyDown={(e) => handleKeyDown(e, hour, setHour, dayRef)}
                                ref={hourRef}
                                className="w-12 p-2 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-african_violet-500"
                            />
                            <input
                                type="text"
                                placeholder="mm"
                                value={minute}
                                onChange={(e) => handleInputChange(e.target.value, setMinute, 2, null)}
                                onKeyDown={(e) => handleKeyDown(e, minute, setMinute, hourRef)}
                                ref={minuteRef}
                                className="w-12 p-2 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-african_violet-500"
                            />
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
