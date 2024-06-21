// Path: strateger-react/src/components/Reloj.js

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Popover } from '@headlessui/react';
import { updateTime } from '../slices/timeSlice';
import { format } from 'date-fns';

const Reloj = () => {
  const dispatch = useDispatch();
  const { localTime, chinaTime, usTime, germanyTime } = useSelector((state) => state.time);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(updateTime());
    }, 1000);
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div className="bg-gray-100 rounded-lg p-2">
        <Popover className="relative">
        <Popover.Button className="text-lg font-bold">
            {format(localTime, 'HH:mm:ss')}
        </Popover.Button>
        <Popover.Panel className="absolute z-10 p-4 bg-white border rounded-lg shadow-lg bottom-full mb-2">
            <div className="mb-2">
            <strong>China: </strong>
            {chinaTime}
            </div>
            <div className="mb-2">
            <strong>Estados Unidos: </strong>
            {usTime}
            </div>
            <div className="mb-2">
            <strong>Alemania: </strong> {germanyTime}
            
            </div>
        </Popover.Panel>
        </Popover>
    </div>
  );
};

export default Reloj;
