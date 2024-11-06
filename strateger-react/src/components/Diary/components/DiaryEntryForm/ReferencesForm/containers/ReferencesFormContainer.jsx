// Path: strateger-react/src/components/Diary/DiaryEntryForm/ReferencesForm/ReferencesForm.js

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { TabGroup, TabList, TabPanel, TabPanels, Tab } from '@headlessui/react';
import AlarmItem from '../components/AlarmItem';
import OrderItem from '../components/OrderItem';
import StrategyItem from '../components/StrategyItem';
import DiaryItem from '../components/DiaryItem';
import PaginationReferencesForm from '../components/PaginationReferencesForm';
import SelectedIds from '../components/SelectedIds';

import Ventanita from '../../../../../common/Ventanita';

import { selectAlarmsData } from '../../../../../../redux/alarm';

import { selectOrderUsdtm } from '../../../../../../redux/order';
import { selectOrderCoinm } from '../../../../../../redux/order';
import { selectOrderSpot } from '../../../../../../redux/order';
import { selectOrderStandard } from '../../../../../../redux/order';


const ReferencesFormContainer = ({ selectedIds, setSelectedIds }) => {  
  const alarmsData = useSelector(selectAlarmsData) || [];
  const ordersUsdt = useSelector(selectOrderUsdtm) || [];
  const ordersCoinm = useSelector(selectOrderCoinm) || [];
  const ordersSpot = useSelector(selectOrderSpot) || [];
  const ordersStandard = useSelector(selectOrderStandard) || [];

  const strategies = useSelector((state) => state.strategies.items) || [];
  const diaryEntries = useSelector((state) => state.diary.items) || [];

  const [currentPage, setCurrentPage] = useState(1);        //ReferencesForm
  const itemsPerPage = 10; 

  const getCurrentItems = (items) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  const totalPages = (items) => Math.ceil(items.length / itemsPerPage);

  const panelsMap = new Map([
    ['Alarms', { items: alarmsData, component: AlarmItem, itemKey: 'alarm' }],
    ['Orders(Usdtm)', { items: ordersUsdt, component: OrderItem, itemKey: 'order' }],
    ['Orders(Coinm)', { items: ordersCoinm, component: OrderItem, itemKey: 'order' }],
    ['Orders(Spot)', { items: ordersSpot, component: OrderItem, itemKey: 'order' }],
    ['Orders(Standard)', { items: ordersStandard, component: OrderItem, itemKey: 'order' }],
    ['Strategies', { items: strategies, component: StrategyItem, itemKey: 'strategy' }],
    ['Diary', { items: diaryEntries, component: DiaryItem, itemKey: 'diary' }],
  ]);  

  const isSelected = (type, id) => {
    return selectedIds.includes(`${type}-${id}`);
  };

  useEffect(() => {
    setCurrentPage(1); 
  }, [setCurrentPage]);

  const handleAddId = (id) => {
    setSelectedIds((prev) => [...prev, id]);
  };

  const handleSelectReference = (type, id) => {
    const reference = `${type}-${id}`;
    const references = selectedIds.includes(reference)
      ? selectedIds.filter(ref => ref !== reference)
      : [...selectedIds, reference];
    setSelectedIds(references);
  };

  return (
    <div className="mb-4">
      <Ventanita
        titulo="References"

        contenido={
          <>
            <TabGroup onChange={() => setCurrentPage(1)}>
              
              {/* ----------------------------------------------------------------- Tabs ------------------------------------------------------------------*/}
              <TabList className="flex bg-african_violet-300 text-blue-300">
                {Array.from(panelsMap.keys()).map((label) => (
                  <Tab
                    key={label}
                    className={({ selected }) =>
                      `w-full py-2 font-small text-african_violet-900'
                      ${
                        selected ? 'text-african_violet-900' : 'text-african_violet-500 hover:bg-african_violet-900 hover:text-african_violet-300'
                      }`
                    }
                  >
                    {label}
                  </Tab>
                ))}
              </TabList>

              {/* ----------------------------------------------------------------- Panels ------------------------------------------------------------------*/}
              <TabPanels className="">
                {Array.from(panelsMap.entries()).map(([label, { items, component: Component, itemKey }]) => (
                  <TabPanel key={label} className="bg-african_violet-200 pl-2 pr-2 pb-2">
                    {getCurrentItems(items).map((item) => (
                      <Component
                        key={`${itemKey}-${item.id || item.orderId}`}
                        {...{ [itemKey]: item }}
                        onSelect={() => handleSelectReference(itemKey, item.id || item.orderId)}
                        isSelected={isSelected(itemKey, item.id || item.orderId)}
                        onAdd={handleAddId}
                      />
                    ))}
                    <PaginationReferencesForm
                      currentPage={currentPage}
                      totalPages={totalPages(items)}
                      setCurrentPage={setCurrentPage}
                    />
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>

            {/* ----------------------------------------------------------------- Selected Reference ------------------------------------------------------------------*/}
            <div className='mt-4'>
              <Ventanita
                titulo={"Selected Reference"}
                contenido={<SelectedIds selectedIds={selectedIds} />}
              />
            </div>
          </>
        }
      />
    </div>
  );
};

export default ReferencesFormContainer;
