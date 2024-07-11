// Path: strateger-react/src/components/Diary/DiaryEntryForm/ReferencesForm/ReferencesForm.js

import React from 'react';
import { Tab } from '@headlessui/react';
import AlarmItem from './AlarmItem';
import OrderItem from './OrderItem';
import StrategyItem from './StrategyItem';
import DiaryItem from './DiaryItem';
import PaginationReferencesForm from './PaginationReferencesForm';

const ReferencesForm = ({
  alarms, orders, strategies, diaryEntries, handleSelectReference,
  handleAddId, isSelected, currentPage, itemsPerPage, setCurrentPage
}) => {
  const getCurrentItems = (items) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  const totalPages = (items) => Math.ceil(items.length / itemsPerPage);

  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-semibold mb-2">References</label>
      <Tab.Group onChange={(index) => setCurrentPage(1)}>
        <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
          {['Alarms', 'Orders', 'Strategies', 'Diary'].map((tab, index) => (
            <Tab
              key={tab}
              className={({ selected }) =>
                `w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg ${
                  selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                }`
              }
            >
              {tab}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel className="bg-white rounded-xl p-3">
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
          <Tab.Panel className="bg-white rounded-xl p-3">
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
          <Tab.Panel className="bg-white rounded-xl p-3">
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
          <Tab.Panel className="bg-white rounded-xl p-3">
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
    </div>
  );
};

export default ReferencesForm;
