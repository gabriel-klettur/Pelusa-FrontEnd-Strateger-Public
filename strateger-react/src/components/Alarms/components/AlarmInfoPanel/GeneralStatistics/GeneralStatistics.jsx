//Path: strateger-react/src/components/Alarms/components/AlarmInfoPanel/GeneralStatistics/GeneralStatistics.jsx

import { useSelector } from "react-redux";
import { selectAlarmsData } from "../../../../../redux/alarm";

const GeneralStatistics = () => {
    const dataAlarms = useSelector(selectAlarmsData);

    // Contar alarmas capturadas hoy
    const today = new Date();
    const todayAlarmsCount = dataAlarms.filter((alarm) => {
        const alarmDate = new Date(alarm.Time_Alert);
        return (
            alarmDate.getDate() === today.getDate() &&
            alarmDate.getMonth() === today.getMonth() &&
            alarmDate.getFullYear() === today.getFullYear()
        );
    }).length;

    // Contar diferentes Tickers y cuántos hay de cada uno
    const tickerCount = dataAlarms.reduce((acc, alarm) => {
        acc[alarm.Ticker] = (acc[alarm.Ticker] || 0) + 1;
        return acc;
    }, {});

    // Contar diferentes Temporalidades y cuántas hay de cada una
    const intervalCount = dataAlarms.reduce((acc, alarm) => {
        acc[alarm.Interval] = (acc[alarm.Interval] || 0) + 1;
        return acc;
    }, {});    

    // Contar alarmas por hora
    const hourCount = dataAlarms.reduce((acc, alarm) => {
        if (alarm.Time_Alert) {
            const hour = new Date(alarm.Time_Alert).getHours();
            acc[hour] = (acc[hour] || 0) + 1;
        }
        return acc;
    }, {});

    // Convertir objeto en array y ordenarlo por cantidad de alarmas
    const sortedHours = Object.entries(hourCount)
        .map(([hour, count]) => ({ hour, count })) // Convertimos a objetos
        .sort((a, b) => a.count - b.count); // Ordenamos por número de alarmas (ascendente)

    // Obtener los 4 horarios con menos alarmas y los 4 con más
    const leastActiveHours = sortedHours.slice(0, 4);
    const mostActiveHours = sortedHours.slice(-4).reverse(); // Los últimos 4, en orden descendente

    // Contar órdenes específicas
    const orderCount = dataAlarms.reduce((acc, alarm) => {
        acc[alarm.Order] = (acc[alarm.Order] || 0) + 1;
        return acc;
    }, {});

    return (
        <div className="h-[535px] w-full p-4 overflow-y-auto custom-scrollbar bg-african_violet-200 text-african_violet-800">            
            <div className="text-lg font-medium text-center mb-6 flex justify-center items-center space-x-4">
                <p>Total Alarms: {dataAlarms.length}</p>
                <p className="text-sm text-gray-400">(Today: {todayAlarmsCount})</p>
            </div>

            {/* Tickers and Temporalities */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-lg font-semibold mb-2">Tickers:</h2>
                    <div className="space-y-1">
                        {Object.entries(tickerCount).map(([ticker, count]) => (
                        <div key={ticker} className="flex justify-between">
                            <span className="font-medium">{ticker}:</span>
                            <span>{count}</span>
                        </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-lg font-semibold mb-2">Intervals:</h2>
                    <div className="space-y-1" data-testid="GeneralStatistics-intervals-list">
                        {Object.entries(intervalCount).map(([interval, count]) => (                       
                            <div key={interval} className="flex justify-between">
                                <span className="font-medium">{interval}:</span>
                                <span>{count}</span>
                            </div>                            
                        ))}
                    </div>
                </div>
            </div>

            {/* Hours */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                <div>
                    <h2 className="text-lg font-semibold mb-2">4 Least Active Hours:</h2>
                    <div className="space-y-1">
                        {leastActiveHours.map(({ hour, count }) => (
                            <div key={hour} className="flex justify-between">
                                <span className="font-medium">{hour}:00 - {hour}:59:</span>
                                <span>{count} alarms</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-lg font-semibold mb-2">4 Most Active Hours:</h2>
                    <div className="space-y-1">
                        {mostActiveHours.map(({ hour, count }) => (
                            <div key={hour} className="flex justify-between">
                                <span className="font-medium">{hour}:00 - {hour}:59:</span>
                                <span>{count} alarms</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Orders */}
            <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2">Orders:</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {["order open long", "order close long", "order open short", "order close short"].map((order) => (
                        <div key={order} className="flex justify-between">
                            <span className="font-medium">{order}:</span>
                            <span>{orderCount[order] || 0}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GeneralStatistics;
