import { Tab, TabGroup, TabList } from '@headlessui/react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSelectedChartTool, setSelectedChartTool } from '../../../../redux/interaction';

const ToolBar = ({ tabs }) => {
  const dispatch = useDispatch();
  const selectedTool = useSelector(selectSelectedChartTool);

  const handleTabClick = (index) => {
    const tool = tabs[index].name;
    console.log(`Tab clicked: ${tool}`);

    // Si el tab clickeado es el mismo que el actual, forzamos una "reseteada".
    if (selectedTool === tool) {
      // Reiniciamos el estado para forzar la activación de la herramienta.
      dispatch(setSelectedChartTool(''));
      setTimeout(() => {
        dispatch(setSelectedChartTool(tool));
      }, 0);
    } else {
      dispatch(setSelectedChartTool(tool));
    }
  };

  return (
    <TabGroup vertical>
      <div className="flex">
        <TabList className="w-12 h-auto">
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              onClick={() => handleTabClick(index)}
              className={() => {
                const baseClasses =
                  'w-full h-14 p-2 text-sm font-medium transition-colors duration-200';
                const disabledClasses = 'cursor-not-allowed bg-gray-500 text-gray-500';
                const selectedClasses = 'bg-african_violet-500 text-african_violet-900';
                const unselectedClasses =
                  'bg-african_violet-300 text-african_violet-700 hover:bg-african_violet-300 hover:text-african_violet-900';

                if (tab.disabled) return `${baseClasses} ${disabledClasses}`;

                // Si no hay herramienta activa, el primer tab (índice 0) se ve seleccionado.
                if (selectedTool === null && index === 0) {
                  return `${baseClasses} ${selectedClasses}`;
                }

                if (selectedTool !== null && tab.name === selectedTool) {
                  return `${baseClasses} ${selectedClasses}`;
                }
                return `${baseClasses} ${unselectedClasses}`;
              }}
              disabled={tab.disabled}
            >
              <img
                src={tab.icon}
                alt={tab.name}
                className={`h-8 w-8 mx-auto ${tab.disabled ? 'opacity-50' : ''}`}
              />
            </Tab>
          ))}
        </TabList>
      </div>
    </TabGroup>
  );
};

export default ToolBar;
