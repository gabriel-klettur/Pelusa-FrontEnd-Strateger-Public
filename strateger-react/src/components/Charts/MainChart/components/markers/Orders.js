// Path: src/components/Charts/MainChart/components/markers/Orders.js

export const mapOrdersToMarkers = (orders, interval) => {  

  if (!Array.isArray(orders) || orders.length === 0) {
    return []; 
  }

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
      text: `${text} (${order.symbol}) [${order.executedQty}]`
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
