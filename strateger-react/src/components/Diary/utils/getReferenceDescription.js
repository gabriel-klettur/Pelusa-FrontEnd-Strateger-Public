// Path: strateger-react/src/components/Diary/utils/getReferenceDescription.js

const getReferenceDescription = (ref, orders, alarms, strategies, diaryEntries) => {
    const [type, id] = ref.split('-');
    switch (type) {
      case 'order':
        const order = orders.find((order) => order.orderId === parseInt(id, 10));
        return order ? `Order: ${order.symbol} - ${order.side}` : 'Order not found';
      case 'alarm':
        const alarm = alarms.find((alarm) => alarm.id === parseInt(id, 10));
        return alarm ? `Alarm: ${alarm.Ticker} - ${alarm.Order}` : 'Alarm not found';
      case 'strategy':
        const strategy = strategies.find((strategy) => strategy.id === parseInt(id, 10));
        return strategy ? `Strategy: ${strategy.name}` : 'Strategy not found';
      case 'diary':
        const diaryEntry = diaryEntries.find((entry) => entry.id === parseInt(id, 10));
        return diaryEntry ? `Diary Entry: ${new Date(diaryEntry.date).toLocaleString()} - ${diaryEntry.text.substring(0, 20)}` : 'Diary entry not found';
      default:
        return 'Unknown reference';
    }
  };
  
  export default getReferenceDescription;
  