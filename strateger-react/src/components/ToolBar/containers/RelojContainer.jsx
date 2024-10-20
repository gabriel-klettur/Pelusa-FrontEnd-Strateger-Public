
import Reloj from '../../common/Reloj';

const RelojContainer = () => {
    return(
        <div className="col-span-2 flex justify-center items-center justify-self-end h-12 border-r-4 border-l-4 border-african_violet-500">
            <Reloj direction="down" />
        </div>
    );   
};

export default RelojContainer;