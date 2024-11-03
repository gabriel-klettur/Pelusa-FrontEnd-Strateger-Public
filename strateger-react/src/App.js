// Path: strateger-react/src/App.js
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { loadSlicesInOrder } from './thunks/loadSlices';
import MainContainer from './containers/MainContainer';
import LoadingSlices from './components/common/LoadingSlices/LoadingSlices';

const App = () => {
    const dispatch = useDispatch();
    const [loadingMessage, setLoadingMessage] = useState('Loading...');
    const [isLoadingVisible, setIsLoadingVisible] = useState(true); // Estado para la visibilidad del div

    //!------------ Load Redux Slices in Order -------------
    useEffect(() => {
      dispatch(loadSlicesInOrder(setLoadingMessage));
    }, [dispatch]);
    //!-----------------------------------------------------

    return (        
      <>
        <LoadingSlices isLoadingVisible={isLoadingVisible} loadingMessage={loadingMessage} setIsLoadingVisible={setIsLoadingVisible}/>          
        <MainContainer/>
      </>             
    );
};

export default App;
