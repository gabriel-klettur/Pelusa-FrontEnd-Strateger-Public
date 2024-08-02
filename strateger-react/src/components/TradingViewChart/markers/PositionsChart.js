// src/components/TradingViewChart/markers/PositionsChart.js

export const mapPositionsToMarkers = (positions) => {
    return positions.map(position => {
      let color, text, positionSide, shape;
  
      switch (position.action) {
        case 'Long':
          color = 'green';
          text = `Entry Long: ${position.price}, Profit: ${position.profit}`;
          positionSide = 'belowBar';
          shape = 'arrowUp';
          break;
        case 'Close Long':
            color = 'purple';
            text = `Close Long: ${position.price}, Profit: ${position.profit}`;
            positionSide = 'aboveBar';
            shape = 'arrowDown';
            break;  
        case 'Short':
          color = 'red';
          text = `Entry Short: ${position.price}, Profit: ${position.profit}`;
          positionSide = 'aboveBar';
          shape = 'arrowDown';
          break;
        case 'Close Short':
            color = 'orange';
            text = `Close Short: ${position.price}, Profit: ${position.profit}`;
            positionSide = 'belowBar';
            shape = 'arrowUp';
            break;
        default:
          color = 'blue';
          text = `Position: ${position.price}`;
          positionSide = 'aboveBar';
          shape = 'circle';
      }
  
      const time = Math.floor(position.time / 1000);
  
      if (isNaN(time)) {
        console.warn(`Invalid time detected for position: ${position.symbol}`, position);
      }
  
      return {
        time: time,
        position: positionSide,
        color: color,
        shape: shape,
        text: text
      };
    }).filter(marker => !isNaN(marker.time));
  };
  