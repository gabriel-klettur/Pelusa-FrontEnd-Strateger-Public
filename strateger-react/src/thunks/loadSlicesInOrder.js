
import { toast } from 'react-toastify';
import { loadMinimumInformation } from './loadSlices';
import { loadChartsInformation } from './loadSlices';
import { loadOrdersInformation } from './loadSlices';
import { loadAccountInformation } from './loadSlices';
import { loadStrategiesInformation } from './loadSlices';
import { loadDiaryInformation } from './loadSlices';
import { loadPositionsInformation } from './loadSlices';


export const loadSlicesInOrder = () => async (dispatch) => {
    try {
      await loadMinimumInformation(dispatch);
      await loadChartsInformation(dispatch);
      await loadOrdersInformation(dispatch);
      await loadAccountInformation(dispatch);
      await loadStrategiesInformation(dispatch);
      await loadDiaryInformation(dispatch);
      await loadPositionsInformation(dispatch);
      
      // Mensaje final de éxito
      toast.success('All Redux slices loaded successfully');
    } catch (error) {
      toast.error('Error loading slices');
      console.error('Error loading slices:', error);
    }
};
  