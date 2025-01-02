import CheckBox from './CheckBox';

const FilterSection = ({ title, items, onChange, gridCols = 2 }) => {
  return (
    <div>
      <h3 className="font-bold text-african_violet-900 mb-2">{title}</h3>
      <div className={`grid grid-cols-${gridCols} gap-4`}>
        {Object.keys(items).map((key) => (
          <div
            key={key}
            className="flex items-center space-x-2 hover:bg-african_violet-200/50 rounded-sm p-2 cursor-pointer"
            onClick={() => onChange(key)} 
          >            
            <CheckBox
              isChecked={items[key]} 
              onClick={() => onChange(key)} 
            />
            <span className="text-african_violet-900">
              {key}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterSection;
