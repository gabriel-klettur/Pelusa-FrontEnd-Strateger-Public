// annotations.js

export const getAnnotations = (selectedAlarms, data) => {
    return selectedAlarms.map(alarm => {
      const time = new Date(alarm.Time_Alert).getTime();
      const price = alarm.Entry_Price_Alert || alarm.Exit_Price_Alert;
  
      console.log(`Alarm time: ${time}, Alarm price: ${price}`); // Consola para verificar
  
      // Encuentra la vela correspondiente (ejemplo para intervalos diarios)
      const candle = data.find(candle => time >= candle[0] && time < candle[0] + 86400000);
  
      if (candle) {
        return {
          point: { xAxis: 0, yAxis: 0, x: candle[0], y: price },
          text: 'A',
          backgroundColor: 'yellow',
          borderColor: 'black',
          borderRadius: 3,
          borderWidth: 1
        };
      } else {
        console.warn(`No matching candle found for time: ${time}`);
        return null;
      }
    }).filter(annotation => annotation !== null);
  };
  