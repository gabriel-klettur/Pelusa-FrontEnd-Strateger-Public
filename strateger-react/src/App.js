// Path: strateger-react/src/App.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import 'react-toastify/dist/ReactToastify.css';

import { loadSlicesInOrder } from './thunks/loadSlicesInOrder';
import MainContainer from './containers/MainContainer';
import ToastConfig from './utils/ToastConfig';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadSlicesInOrder()); // Pasamos la función toast para mostrar mensajes
    }, [dispatch]);

    // Contenedor de toast
    return (        
      <>
        <ToastConfig/>
        <MainContainer/>
      </>
    );
};

export default App;
