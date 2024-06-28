// Path: strateger-react/src/components/TradingViewChart/OrdersChart.js

export const mapOrdersToMarkers = (orders, interval) => {
  return orders.map(order => {
    let color, text, position, shape;
    switch (order.side) {
      case 'BUY':
        color = 'green';
        text = 'Buy';
        position = 'belowBar';
        shape = 'arrowUp';
        break;
      case 'SELL':
        color = 'red';
        text = 'Sell';
        position = 'aboveBar';
        shape = 'arrowDown';
        break;
      default:
        color = 'black';
        text = 'Order';
        position = 'aboveBar';
        shape = 'circle';
    }

    return {
      time: Math.floor(new Date(order.time).getTime() / 1000),
      position: position,
      color: color,
      shape: shape,
      text: `${text} (${order.symbol})`
    };
  });
};

export const sortAndFilterMarkers = (markers) => {
  return markers
    .sort((a, b) => a.time - b.time)
    .filter((item, index, array) => {
      if (index === 0 || item.time !== array[index - 1].time || item.text !== array[index - 1].text) {
        return true;
      } else {
        return false;
      }
    });
};
