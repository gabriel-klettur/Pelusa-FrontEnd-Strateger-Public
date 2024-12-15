import CheckIcon from '../../../assets/check_icon.svg';

const CheckBox = ({ isChecked, callback }) => {
  return (
    <div
      className={`checkbox ${
        isChecked ? 'checkbox-checked' : 'checkbox-unchecked'
      } `}
      onClick={(e) => {
        e.stopPropagation();    // avoid propagation of the event
        callback();              
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

export default CheckBox;
