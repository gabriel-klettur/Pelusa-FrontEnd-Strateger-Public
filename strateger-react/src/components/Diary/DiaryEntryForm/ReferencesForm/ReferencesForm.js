// Path: strateger-react/src/components/Diary/DiaryEntryForm/ReferencesForm/ReferencesForm.js

import React from 'react';
import { Tab } from '@headlessui/react';
import AlarmItem from './AlarmItem';
import OrderItem from './OrderItem';
import StrategyItem from './StrategyItem';
import DiaryItem from './DiaryItem';
import PaginationReferencesForm from './PaginationReferencesForm';
import SelectedIds from './SelectedIds';

import Ventanita from '../../../common/Ventanita';

const ReferencesForm = ({
  alarms, orders, strategies, diaryEntries, handleSelectReference,
  handleAddId, isSelected, currentPage, itemsPerPage, setCurrentPage, selectedIds
}) => {
  const getCurrentItems = (items) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  const totalPages = (items) => Math.ceil(items.length / itemsPerPage);

  return (
    <div className="mb-4">      
      <Tab.Group onChange={() => setCurrentPage(1)}>
        
        {/* ----------------------------------------------------------------- Tabs ------------------------------------------------------------------*/}
        <Tab.List className="flex bg-african_violet-300 text-blue-300">
          {['Alarms', 'Orders', 'Strategies', 'Diary'].map((tab, index) => (
            <Tab
              key={tab}
              className={({ selected }) =>
                `w-full py-2 font-medium text-african_violet-900'
                ${
                  selected ? 'text-african_violet-900' : 'text-african_violet-500 hover:bg-african_violet-900 hover:text-african_violet-300'
                }`
              }
            >
              {tab}
            </Tab>
          ))}
        </Tab.List>

        {/* ----------------------------------------------------------------- Panels ------------------------------------------------------------------*/}
        <Tab.Panels className="">

          {/* ----------------------------------------------------------------- Alarms ------------------------------------------------------------------*/}
          <Tab.Panel className="bg-african_violet-200 pl-2 pr-2 pb-2">
            {getCurrentItems(alarms).map(alarm => (
              <AlarmItem
                key={`alarm-${alarm.id}`}
                alarm={alarm}
                onSelect={() => handleSelectReference('alarm', alarm.id)}
                isSelected={isSelected('alarm', alarm.id)}
                onAdd={handleAddId}
              />
            ))}
            <PaginationReferencesForm
              currentPage={currentPage}
              totalPages={totalPages(alarms)}
              setCurrentPage={setCurrentPage}
            />
          </Tab.Panel>

          {/* ----------------------------------------------------------------- Orders ------------------------------------------------------------------*/}
          <Tab.Panel className="bg-african_violet-200 pl-2 pr-2 pb-2">
            {getCurrentItems(orders).map(order => (
              <OrderItem
                key={`order-${order.orderId}`}
                order={order}
                onSelect={() => handleSelectReference('order', order.orderId)}
                isSelected={isSelected('order', order.orderId)}
                onAdd={handleAddId}
              />
            ))}
            <PaginationReferencesForm
              currentPage={currentPage}
              totalPages={totalPages(orders)}
              setCurrentPage={setCurrentPage}
            />
          </Tab.Panel>

          {/* ----------------------------------------------------------------- Strategies ------------------------------------------------------------------*/}
          <Tab.Panel className="bg-african_violet-200 pl-2 pr-2 pb-2">
            {getCurrentItems(strategies).map(strategy => (
              <StrategyItem
                key={`strategy-${strategy.id}`}
                strategy={strategy}
                onSelect={() => handleSelectReference('strategy', strategy.id)}
                isSelected={isSelected('strategy', strategy.id)}
                onAdd={handleAddId}
              />
            ))}
            <PaginationReferencesForm
              currentPage={currentPage}
              totalPages={totalPages(strategies)}
              setCurrentPage={setCurrentPage}
            />
          </Tab.Panel>

          {/* ----------------------------------------------------------------- Diary ------------------------------------------------------------------*/}
          <Tab.Panel className="bg-african_violet-200 pl-2 pr-2 pb-2">
            {getCurrentItems(diaryEntries).map(diary => (
              <DiaryItem
                key={`diary-${diary.id}`}
                diary={diary}
                onSelect={() => handleSelectReference('diary', diary.id)}
                isSelected={isSelected('diary', diary.id)}
                onAdd={handleAddId}
              />
            ))}
            <PaginationReferencesForm
              currentPage={currentPage}
              totalPages={totalPages(diaryEntries)}
              setCurrentPage={setCurrentPage}
            />
          </Tab.Panel>


        </Tab.Panels>
      </Tab.Group>

      {/* ----------------------------------------------------------------- Selected Reference ------------------------------------------------------------------*/}
      <div className='mt-4'>
        <Ventanita
          titulo={
            "Selected Reference"
          }
          contenido={
            <SelectedIds selectedIds={selectedIds} />
          }
        />
      </div>
      

    </div>
  );
};

export default ReferencesForm;
