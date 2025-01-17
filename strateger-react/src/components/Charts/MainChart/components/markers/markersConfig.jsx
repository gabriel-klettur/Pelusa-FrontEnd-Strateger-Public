export const MARKER_TYPES = {
    ORDER: {
      BUY: { color: 'green', text: 'Buy', position: 'belowBar', shape: 'arrowUp' },
      SELL: { color: 'red', text: 'Sell', position: 'aboveBar', shape: 'arrowDown' },
    },
    ALARM: {
      OPEN_LONG: { color: 'green', text: 'Entry Long', position: 'belowBar', shape: 'arrowUp' },
      CLOSE_LONG: { color: 'purple', text: 'Close Long', position: 'aboveBar', shape: 'arrowDown' },
      OPEN_SHORT: { color: 'orange', text: 'Entry Short', position: 'aboveBar', shape: 'arrowDown' },
      CLOSE_SHORT: { color: 'red', text: 'Close Short', position: 'belowBar', shape: 'arrowUp' },
    },
    POSITION: {
      LONG: { color: 'green', text: 'Entry Long', position: 'belowBar', shape: 'arrowUp' },
      SHORT: { color: 'red', text: 'Entry Short', position: 'aboveBar', shape: 'arrowDown' },
      CLOSE_LONG: { color: 'purple', text: 'Close Long', position: 'aboveBar', shape: 'arrowDown' },
      CLOSE_SHORT: { color: 'orange', text: 'Close Short', position: 'belowBar', shape: 'arrowUp' },
    },
  };
  