// src/components/TradingViewChart/markers/PositionsChart.js

export const mapPositionsToMarkers = (positions) => {
    return positions.map(position => {
      let color, text, positionSide, shape;
  
      switch (position.action) {
        case 'Buy':
          color = 'green';
          text = `Buy: ${position.price}`;
          positionSide = 'belowBar';
          shape = 'arrowUp';
          break;
        case 'Sell':
          color = 'red';
          text = `Sell: ${position.price}`;
          positionSide = 'aboveBar';
          shape = 'arrowDown';
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
  