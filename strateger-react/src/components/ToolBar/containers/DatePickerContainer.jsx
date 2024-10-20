
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DatePickerContainer = ({setLocalDate, currentInterval, onDateChange, localDate}) => {

    const handleDateChange = (date) => {
        setLocalDate(date);
        const newStartDate = new Date(date);
        const newEndDate = new Date(date);
    
        // Adjust startDate and endDate based on the selected interval
        switch (currentInterval) {
          case '1m':
            newStartDate.setMinutes(newStartDate.getMinutes() - 1000);
            newEndDate.setMinutes(newEndDate.getMinutes() + 1000);
            break;
          case '5m':
            newStartDate.setHours(newStartDate.getHours() - 1000);
            newEndDate.setHours(newEndDate.getHours() + 1000);
            break;
          case '15m':
            newStartDate.setHours(newStartDate.getHours() - 1000);
            newEndDate.setHours(newEndDate.getHours() + 1000);
            break;
          case '30m':
            newStartDate.setHours(newStartDate.getHours() - 1000);
            newEndDate.setHours(newEndDate.getHours() + 1000);
            break;
          case '1h':
            newStartDate.setHours(newStartDate.getHours() - 1000);
            newEndDate.setHours(newEndDate.getHours() + 1000);
            break;
          case '4h':
            newStartDate.setDate(newStartDate.getDate() - 1000);
            newEndDate.setDate(newEndDate.getDate() + 1000);
            break;
          case '1d':
            newStartDate.setDate(newStartDate.getDate() - 1000);
            newEndDate.setDate(newEndDate.getDate() + 1000);
            break;
          case '1w':
            newStartDate.setDate(newStartDate.getDate() - 1000);
            newEndDate.setDate(newEndDate.getDate() + 1000);
            break;
          case '1M':
            newStartDate.setMonth(newStartDate.getMonth() - 32);
            newEndDate.setMonth(newEndDate.getMonth() + 32);
            break;
          default:
            break;
        }
    
        onDateChange(newStartDate.toISOString(), newEndDate.toISOString());
    };

    return(
        <DatePicker
            selected={localDate}
            onChange={handleDateChange}
            showTimeSelect
            dateFormat="HH:mm dd-MM-yyyy" 
            className="px-4 h-12 font-semibold transition-colors duration-300 bg-african_violet-200 hover:bg-african_violet-600 text-white text-center"
        />   
    )
}

export default DatePickerContainer;