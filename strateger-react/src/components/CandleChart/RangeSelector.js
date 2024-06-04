//Path: strateger-react/src/components/CandleChart/RangeSelector.js

const RangeSelector = () => {
    return {
      selected: 4,  // Initially select the "All" option (index 4)
      inputEnabled: true,
      buttons: [
        {
          type: 'month',
          count: 1,
          text: '1M',
        },
        {
          type: 'month',
          count: 3,
          text: '3M',
        },
        {
          type: 'month',
          count: 6,
          text: '6M',
        },
        {
          type: 'year',
          count: 1,
          text: '1Y',
        },
        {
          type: 'all',
          text: 'All',
        },
      ],
      inputDateFormat: '%Y-%m-%d',            
    };
  };
  
  export default RangeSelector;
  