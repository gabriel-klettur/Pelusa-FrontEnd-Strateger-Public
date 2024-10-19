import React, { useState } from 'react';
import DateForm from '../../../common/DateForm';
import { useDispatch, useSelector } from 'react-redux';
import { runBacktest } from '../../../../redux/backtesting';
import { Select, Checkbox, Field, Label } from '@headlessui/react';
import { format } from 'date-fns';
import LoadingOverlay from '../../../common/LoadingOverlay/LoadingOverlay';

const BacktestingForm = () => {
    const dispatch = useDispatch();
    const { status } = useSelector((state) => state.backtesting);

    const initialStartDate = new Date('2024-01-01T00:00:00').toISOString().slice(0, 16);
    const initialEndDate = new Date('2024-03-01T00:00:00').toISOString().slice(0, 16);

    const [symbol, setSymbol] = useState('BTC-USDT');
    const [interval, setInterval] = useState('1h');
    const [startDate, setStartDate] = useState(initialStartDate);
    const [endDate, setEndDate] = useState(initialEndDate);
    const [initialBalance, setInitialBalance] = useState('');
    const [longEnabled, setLongEnabled] = useState(true); // Valor por defecto True
    const [shortEnabled, setShortEnabled] = useState(false); // Valor por defecto False

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        if (name === 'startDate') {
            setStartDate(value);
        } else if (name === 'endDate') {
            setEndDate(value);
        }
    };

    const handleInitialBalanceChange = (e) => {
        const { value } = e.target;
        const regex = /^\d*\.?\d{0,2}$/; // Validar hasta 2 decimales
        if (regex.test(value)) {
            setInitialBalance(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const backtestData = {
            symbol,
            interval,
            startDate: format(new Date(startDate), 'yyyy-MM-dd HH:mm:ss'),
            endDate: format(new Date(endDate), 'yyyy-MM-dd HH:mm:ss'),
            initialBalance: parseFloat(initialBalance) || 10000, // Valor por defecto si el input está vacío
            enable_long: longEnabled,
            enable_short: shortEnabled,
        };
        dispatch(runBacktest(backtestData));
        console.log(backtestData);
    };

    const handleReset = () => {
        setSymbol('BTC-USDT');        
        setStartDate(initialStartDate);
        setEndDate(initialEndDate);
        setInitialBalance('');
        setLongEnabled(true); // Restablecer al valor por defecto
        setShortEnabled(false); // Restablecer al valor por defecto
    };

    return (
        <div className="relative">
            <LoadingOverlay isLoading={status === 'loading'} />
            
            <form onSubmit={handleSubmit} className={`bg-white p-8 rounded-md shadow-md grid grid-cols-2 gap-2 ${status === 'loading' ? 'opacity-50' : ''}`}>                        
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Symbol</label>
                    <input
                        type="text"
                        value={symbol}
                        onChange={(e) => setSymbol(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Interval</label>
                    <Select
                        as="select"
                        value={interval}
                        onChange={(e) => setInterval(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                        <option value="1m">1m</option>
                        <option value="5m">5m</option>
                        <option value="15m">15m</option>
                        <option value="30m">30m</option>
                        <option value="1h">1h</option>
                        <option value="4h">4h</option>
                        <option value="D">D</option>
                        <option value="W">W</option>
                        <option value="M">M</option>
                    </Select>
                </div>

                
                <DateForm date={startDate} handleChange={handleDateChange} name="startDate" />
                <DateForm date={endDate} handleChange={handleDateChange} name="endDate" />

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Initial Balance</label>
                    <input
                        type="text"
                        value={initialBalance}
                        onChange={handleInitialBalanceChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="0.00"
                    />
                </div>

                <div className="grid grid-cols-2">
                    <Field className="flex items-center gap-2 border-2 rounded-md p-2">
                        <Checkbox
                            checked={longEnabled}
                            onChange={setLongEnabled}
                            className="group block h-4 w-4 rounded border bg-white data-[checked]:bg-blue-500"
                        >
                            <svg className="stroke-white opacity-0 group-data-[checked]:opacity-100" viewBox="0 0 14 14" fill="none">
                                <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Checkbox>
                        <Label>Long enable</Label>
                    </Field>
                    <Field className="flex items-center gap-2 border-2 rounded-md p-2">
                        <Checkbox
                            checked={shortEnabled}
                            onChange={setShortEnabled}
                            className="group block h-4 w-4 rounded border bg-white data-[checked]:bg-blue-500"
                        >
                            <svg className="stroke-white opacity-0 group-data-[checked]:opacity-100" viewBox="0 0 14 14" fill="none">
                                <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Checkbox>
                        <Label>Short enable</Label>
                    </Field>
                </div>
                
                <div className="flex space-x-4 col-span-2">
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Run Backtest
                    </button>
                    <button
                        type="button"
                        onClick={handleReset}
                        className="w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-300"
                    >
                        Reset
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BacktestingForm;
