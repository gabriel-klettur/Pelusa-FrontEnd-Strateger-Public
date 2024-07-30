import React, { useState } from 'react';
import DateForm from '../../DateForm';
import { useDispatch, useSelector } from 'react-redux';
import { runBacktest } from '../../../slices/backtestingSlice';
import { Select } from '@headlessui/react';
import { format } from 'date-fns';

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
            initialBalance: parseFloat(initialBalance) // Asegurarse de que sea un número
        };
        dispatch(runBacktest(backtestData));
    };

    const handleReset = () => {
        setSymbol('BTC-USDT');        
        setStartDate(initialStartDate);
        setEndDate(initialEndDate);
        setInitialBalance('');
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Backtesting Form</h2>
            
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

            {status === 'loading' && (
                <div className="mb-4 text-blue-500">
                    Loading...
                </div>
            )}

            <div className="flex space-x-4">
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
    );
};

export default BacktestingForm;
