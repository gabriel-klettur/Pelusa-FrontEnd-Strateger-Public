import React from 'react';
import MainCharts from '../../components/Charts/MainCharts';
import RightSidebar from './RightSidebar';

import alarmImage from '../../assets/images/alarm.webp';
import ordersImage from '../../assets/images/orders.webp';
import positionsImage from '../../assets/images/positions.webp';
import backtestingImage from '../../assets/images/backtesting.webp';

import ToolAlarmBar from '../../components/Alarms/components/AlarmToolPanel/AlarmToolPanel';
import ToolOrderBar from '../../components/Orders/components/ToolOrderBar/ToolOrderBar';
import DiaryCalendar from '../../components/Diary/components/DiaryCalendar/DiaryCalendar';
import SummaryChart from '../../components/Account/components/AccountSummary/AccountSummary';
import BacktestingForm from '../../components/Backtesting/components/BacktestingForm/BacktestingForm';

const Body = ({ initialTemporalidad, selectedStartDate, selectedEndDate, selectedTab }) => {

  const tabContentMap = {
    0: { component: <ToolAlarmBar />, image: alarmImage, ImageHeight: 'h-64', componentHeight: 'h-32', leftContainerSpan: 'col-span-8', rightContainerSpan: 'col-span-2' },
    1: { component: <ToolOrderBar />, image: ordersImage, ImageHeight: 'h-96', componentHeight: 'h-32', leftContainerSpan: 'col-span-8', rightContainerSpan: 'col-span-2' },
    2: { component: null, image: null, ImageHeight: 'h-0', componentHeight: 'h-0', leftContainerSpan: 'col-span-10', rightContainerSpan: 'col-span-0' },
    3: { component: <DiaryCalendar results={[]} />, image: null, ImageHeight: 'h-0', componentHeight: 'h-32', leftContainerSpan: 'col-span-8', rightContainerSpan: 'col-span-2' },
    4: { component: <SummaryChart />, image: null, ImageHeight: 'max-h-64', componentHeight: 'h-64', leftContainerSpan: 'col-span-7', rightContainerSpan: 'col-span-3' },
    5: { component: 'GRAFICO', image: positionsImage, ImageHeight: 'max-h-64', componentHeight: 'h-64', leftContainerSpan: 'col-span-7', rightContainerSpan: 'col-span-3' },
    6: { component: <BacktestingForm />, image: backtestingImage, ImageHeight: 'h-32', componentHeight: 'h-64', leftContainerSpan: 'col-span-7', rightContainerSpan: 'col-span-3' },
    7: { component: null, image: null, ImageHeight: 'max-h-full', componentHeight: 'h-64', leftContainerSpan: 'col-span-7', rightContainerSpan: 'col-span-3' },
  };

  const { component, image, ImageHeight, componentHeight, leftContainerSpan, rightContainerSpan } = tabContentMap[selectedTab];

  return (
    <div className="grid grid-cols-10 gap-1">
      <div className={`${leftContainerSpan} flex flex-col bg-white p-2 rounded-br-lg mt-1`}>
        <MainCharts
          initialTemporalidad={initialTemporalidad}
          initialStartDate={selectedStartDate.toISOString()}
          initialEndDate={selectedEndDate.toISOString()}
        />
      </div>

      <div className={`${rightContainerSpan}`}>
        <RightSidebar selectedTab={selectedTab} component={component} image={image} ImageHeight={ImageHeight} componentHeight={componentHeight} />
      </div>
    </div>
  );
};

export default Body;
