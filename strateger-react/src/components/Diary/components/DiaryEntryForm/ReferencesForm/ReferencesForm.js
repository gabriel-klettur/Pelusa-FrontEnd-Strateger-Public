// Path: strateger-react/src/components/Diary/DiaryEntryForm/ReferencesForm/ReferencesForm.js

import React from 'react';
import { Tab } from '@headlessui/react';
import AlarmItem from './AlarmItem';
import OrderItem from './OrderItem';
import StrategyItem from './StrategyItem';
import DiaryItem from './DiaryItem';
import PaginationReferencesForm from './PaginationReferencesForm';
import SelectedIds from './SelectedIds';

import Ventanita from '../../../../common/Ventanita';

const ReferencesForm = ({
  alarms, orders, strategies, diaryEntries, handleSelectReference,
  handleAddId, isSelected, currentPage, itemsPerPage, setCurrentPage, selectedIds
}) => {
  const getCurrentItems = (items) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  const totalPages = (items) => Math.ceil(items.length / itemsPerPage);

  const panelsMap = new Map([
    ['Alarms', { items: alarms, component: AlarmItem, itemKey: 'alarm' }],
    ['Orders', { items: orders, component: OrderItem, itemKey: 'order' }],
    ['Strategies', { items: strategies, component: StrategyItem, itemKey: 'strategy' }],
    ['Diary', { items: diaryEntries, component: DiaryItem, itemKey: 'diary' }],
  ]);  

  return (
    <div className="mb-4">
      <Tab.Group onChange={() => setCurrentPage(1)}>
        
        {/* ----------------------------------------------------------------- Tabs ------------------------------------------------------------------*/}
        <Tab.List className="flex bg-african_violet-300 text-blue-300">
          {Array.from(panelsMap.keys()).map((label) => (
            <Tab
              key={label}
              className={({ selected }) =>
                `w-full py-2 font-medium text-african_violet-900'
                ${
                  selected ? 'text-african_violet-900' : 'text-african_violet-500 hover:bg-african_violet-900 hover:text-african_violet-300'
                }`
              }
            >
              {label}
            </Tab>
          ))}
        </Tab.List>

        {/* ----------------------------------------------------------------- Panels ------------------------------------------------------------------*/}
        <Tab.Panels className="">
          {Array.from(panelsMap.entries()).map(([label, { items, component: Component, itemKey }]) => (
            <Tab.Panel key={label} className="bg-african_violet-200 pl-2 pr-2 pb-2">
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
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>

      {/* ----------------------------------------------------------------- Selected Reference ------------------------------------------------------------------*/}
      <div className='mt-4'>
        <Ventanita
          titulo={"Selected Reference"}
          contenido={<SelectedIds selectedIds={selectedIds} />}
        />
      </div>
    </div>
  );
};

export default ReferencesForm;
