const FilterSection = ({ title, items, onChange, gridCols = 2 }) => {
  return (
    <div>
      <h3 className="font-bold text-african_violet-900 mb-2">{title}</h3>
      <div className={`grid grid-cols-${gridCols} gap-4`}>
        {Object.keys(items).map((key) => (
          <div
            key={key}
            className="flex items-center space-x-2 hover:bg-african_violet-200/50 rounded-md p-2 cursor-pointer"
            onClick={(e) => {                          
              onChange(key); // Manejar el cambio de estado
            }}
          >
            {/* Checkbox personalizado */}
            <div
              className={`w-5 h-5 rounded border ${
                items[key] ? 'bg-blue-500' : 'bg-white'
              } flex justify-center items-center`}
              onClick={(e) => {
                e.stopPropagation(); // Evitar que el clic en el checkbox cierre algo
                onChange(key); // Cambiar el estado del checkbox
              }}
            >
              {items[key] && (
                <svg
                  className="stroke-white"
                  viewBox="0 0 14 14"
                  fill="none"
                  width="12"
                  height="12"
                >
                  <path
                    d="M3 8L6 11L11 3.5"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <span className="text-african_violet-900">{key}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterSection;
