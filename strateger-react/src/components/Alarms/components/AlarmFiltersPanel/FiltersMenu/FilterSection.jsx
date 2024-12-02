import { MenuItem } from '@headlessui/react';
import { Checkbox } from '@headlessui/react';

const FilterSection = ({ title, items, onChange, gridCols = 2 }) => {
  return (
    <div>
      <h3 className="font-bold text-african_violet-900 mb-2">{title}</h3>
      <div className={`grid grid-cols-${gridCols} gap-4`}>
        {Object.keys(items).map((key) => (
          <MenuItem
            key={key}
            as="div"
            className="flex items-center space-x-2 hover:bg-african_violet-200/50 rounded-md p-2 cursor-pointer"
            onClick={(e) => {
              e.preventDefault(); // Prevenir el cierre del menú
              e.stopPropagation(); // Evitar propagación
              onChange(key); // Activar el cambio de estado
            }}
          >
            <Checkbox
              checked={items[key]}
              onChange={() => onChange(key)} // Asegurar funcionalidad del Checkbox
              className="group block w-5 h-5 rounded border bg-white data-[checked]:bg-blue-500"
              onClick={(e) => e.stopPropagation()} // Evitar que el clic en el Checkbox cierre el menú
            >
              <svg
                className="stroke-white opacity-0 group-data-[checked]:opacity-100"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Checkbox>
            <span className="text-african_violet-900">{key}</span>
          </MenuItem>
        ))}
      </div>
    </div>
  );
};

export default FilterSection;
