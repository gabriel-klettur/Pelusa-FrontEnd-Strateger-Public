import { useEffect } from 'react';

const LoadingSlices = ({isLoadingVisible, loadingMessage, setIsLoadingVisible}) => {

    useEffect(() => {
        if (loadingMessage === 'All Redux slices loaded') {
            const timer = setTimeout(() => setIsLoadingVisible(false), 3000); // Ocultar después de 3 segundos
            return () => clearTimeout(timer); // Limpiar el temporizador cuando el componente se desmonte o cambie el mensaje
        }
    }, [loadingMessage, setIsLoadingVisible]);

    return (
        isLoadingVisible && loadingMessage ? (            
            <div className="fixed bottom-4 left-5 border-2 border-black bg-white p-2 rounded-lg z-50">
                <h1 className="text-black text-2xl">{loadingMessage}</h1>
            </div>
        ) : null
    );
}

export default LoadingSlices;
