import CheckIcon from '../../../assets/check_icon.svg';

const FiltersCheckBox = ({ isChecked, onClick }) => {
  return (
    <div
      className={`checkbox ${
        isChecked ? 'bg-blue-500' : 'bg-white'
      } `}
      onClick={(e) => {
        e.stopPropagation();    // Evitar propagación del evento
        onClick();              // Ejecutar el callback de cambio
      }}
    >
      {isChecked && (
        <img
          src={CheckIcon}
          alt="check icon"
          className="w-4 h-4"
        />
      )}
    </div>
  );
};

export default FiltersCheckBox;
