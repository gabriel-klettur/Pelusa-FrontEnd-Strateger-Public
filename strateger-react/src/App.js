// Path: strateger-react/src/App.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { loadSlicesInOrder } from './thunks/loadSlices';
import MainContainer from './containers/MainContainer';

const App = () => {
    const dispatch = useDispatch();
    
    //!------------ Load Redux Slices in Order -------------
    useEffect(() => {
      dispatch(loadSlicesInOrder());
    }, [dispatch]);
    //!-----------------------------------------------------

    return (        
        <>
          <MainContainer/>
        </>             
    );
};

export default App;
