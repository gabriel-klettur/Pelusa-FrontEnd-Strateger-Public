import CheckIcon from 'Alarms/assets/check_icon.svg';

const CheckBox = ({ isChecked, callback }) => {
  return (
    <div
      className={`checkbox ${isChecked ? 'checkbox-checked' : 'checkbox-unchecked'} `}
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
