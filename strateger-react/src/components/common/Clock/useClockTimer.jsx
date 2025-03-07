import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateTime } from 'reduxStore/time/timeSlice';

const useClockTimer = (initialState = 0) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const interval = setInterval(() => {
          dispatch(updateTime());
        }, 1000);
        return () => clearInterval(interval);
      }, [dispatch]);
}

export default useClockTimer;
