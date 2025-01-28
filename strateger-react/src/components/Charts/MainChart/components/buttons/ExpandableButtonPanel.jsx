import { useState } from "react";
import ItemChartButton from "./ItemChartButton";
import collapseIcon from '../../../assets/collapse.svg';
import indicatorsIcon from '../../../../../assets/indicators.svg';

const ExpandableButtonPanel = ({ buttons, title }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="flex space-x-1 items-center">
      {/* Botón principal: Solo se muestra si los botones están colapsados */}
      {!expanded && (
        <ItemChartButton setShow={toggleExpand} indicatorName={title} icon={indicatorsIcon}/>
      )}

      {/* Contenedor animado */}
      <div
        className={`flex space-x-1 transition-all duration-300 ease-in-out ${
          expanded ? "opacity-100 scale-100 w-auto" : "opacity-0 scale-90 w-0"
        }`}
      >
        {/* Renderizar los botones solo si expanded es true */}
        {expanded &&
          buttons.map(({ id, setShow, indicatorName, isVisible, disabled }) => (
            <ItemChartButton
              key={id}
              setShow={setShow}
              indicatorName={indicatorName}
              isVisible={isVisible}
              disabled={disabled}
              className={`transition-all duration-300 ease-in-out ${
                expanded ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
              }`}
            />
          ))}

        {/* Botón para colapsar */}
        {expanded && (
          <ItemChartButton
            setShow={toggleExpand}
            icon={collapseIcon}
            className="transition-all duration-300 ease-in-out"
          />
        )}
      </div>
    </div>
  );
};

export default ExpandableButtonPanel;
