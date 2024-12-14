// Path: strateger-react/src/components/Alarms/components/AlarmInfoPanel/AlarmOverviewPanel/AlarmOverviewPanel.jsx

import { useSelector } from "react-redux";
import { selectAlarmsData } from "../../../../../redux/alarm";

//!----------------------------- Utility functions for data processing ------------------------------------
const countAlarmsToday = (dataAlarms) => {
    const today = new Date();
    return dataAlarms.filter((alarm) => {
        const alarmDate = new Date(alarm.Time_Alert);
        return (
            alarmDate.getDate() === today.getDate() &&
            alarmDate.getMonth() === today.getMonth() &&
            alarmDate.getFullYear() === today.getFullYear()
        );
    }).length;
};

const countByProperty = (dataAlarms, property) => {
    return dataAlarms.reduce((acc, alarm) => {
        acc[alarm[property]] = (acc[alarm[property]] || 0) + 1;
        return acc;
    }, {});
};

const countAlarmsByHour = (dataAlarms) => {
    return dataAlarms.reduce((acc, alarm) => {
        if (alarm.Time_Alert) {
            const hour = new Date(alarm.Time_Alert).getHours();
            acc[hour] = (acc[hour] || 0) + 1;
        }
        return acc;
    }, {});
};

const sortEntriesByCount = (entries) => {
    return Object.entries(entries)
        .map(([key, count]) => ({ key, count }))
        .sort((a, b) => a.count - b.count);
};

//!-------------------------------- AlarmOverviewPanel component -----------------------------------------

const AlarmOverviewPanel = () => {
    const dataAlarms = useSelector(selectAlarmsData);

    const todayAlarmsCount = countAlarmsToday(dataAlarms);
    const tickerCount = countByProperty(dataAlarms, 'Ticker');
    const intervalCount = countByProperty(dataAlarms, 'Interval');
    const orderCount = countByProperty(dataAlarms, 'Order');
    const hourCount = countAlarmsByHour(dataAlarms);
    const sortedHours = sortEntriesByCount(hourCount);
    
    const leastActiveHours = sortedHours.slice(0, 4);
    const mostActiveHours = sortedHours.slice(-4).reverse();

    return (
        <div 
            className="h-[535px] w-full p-4 overflow-y-auto custom-scrollbar bg-african_violet-200 text-african_violet-800" 
            data-testid="general-statistics"
        >
            <HeaderSection totalAlarms={dataAlarms.length} todayAlarmsCount={todayAlarmsCount} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <PropertyCountSection title="Tickers" data={tickerCount} />
                <PropertyCountSection title="Intervals" data={intervalCount} testId="AlarmOverviewPanel-intervals-list" />
            </div>

            <HourActivitySection leastActiveHours={leastActiveHours} mostActiveHours={mostActiveHours} />

            <OrderCountSection orderCount={orderCount} />
        </div>
    );
};

//! ---------------------------------- Sub-components ----------------------------------------------

const HeaderSection = ({ totalAlarms, todayAlarmsCount }) => (
    <div className="text-lg font-medium text-center mb-6 flex justify-center items-center space-x-4">
        <p>Total Alarms: {totalAlarms}</p>
        <p className="text-sm text-gray-400">(Today: {todayAlarmsCount})</p>
    </div>
);

const PropertyCountSection = ({ title, data, testId }) => (
    <div>
        <h2 className="text-lg font-semibold mb-2">{title}:</h2>
        <div className="space-y-1" data-testid={testId}>
            {Object.entries(data).map(([key, count]) => (
                <div key={key} className="flex justify-between">
                    <span className="font-medium">{key}:</span>
                    <span>{count}</span>
                </div>
            ))}
        </div>
    </div>
);

const HourActivitySection = ({ leastActiveHours, mostActiveHours }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        <ActivitySection title="4 Least Active Hours" hoursData={leastActiveHours} />
        <ActivitySection title="4 Most Active Hours" hoursData={mostActiveHours} />
    </div>
);

const ActivitySection = ({ title, hoursData }) => (
    <div>
        <h2 className="text-lg font-semibold mb-2">{title}:</h2>
        <div className="space-y-1">
            {hoursData.map(({ key: hour, count }) => (
                <div key={hour} className="flex justify-between">
                    <span className="font-medium">{hour}:00 - {hour}:59:</span>
                    <span>{count} alarms</span>
                </div>
            ))}
        </div>
    </div>
);

const OrderCountSection = ({ orderCount }) => (
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
);

export default AlarmOverviewPanel;
