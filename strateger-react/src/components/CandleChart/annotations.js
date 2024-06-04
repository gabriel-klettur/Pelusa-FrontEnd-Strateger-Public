// Path: strateger-react/src/components/CandleChart/annotations.js

/**
 * Retrieves annotations for selected alarms based on the provided data.
 * @param {Array} selectedAlarms - The array of selected alarms. 
 * @returns {Array} - The array of annotations.
 */

export const getAnnotations = (selectedAlarms) => {
  //console.log("*****************************************************************")

  const annotations = [];

  selectedAlarms.forEach((alarm, index) => {
    const time = new Date(alarm.Time_Alert).getTime();
    const price = alarm.Entry_Price_Alert || alarm.Exit_Price_Alert;
    let bgColor = '';
    let textColor = '';

    //console.log("-----------------------------------------")
    //console.log('Alarm:', alarm);
    //console.log("-----------------------------------------")

    if (alarm.Order === 'open long') {
      bgColor = 'green';
      textColor = 'white';
    } else if (alarm.Order === 'open short') {
      bgColor = 'red';
      textColor = 'white';
    } else if (alarm.Order === 'close long') {
      bgColor = 'blue';
      textColor = 'white';
    } else if (alarm.Order === 'close short') {
      bgColor = 'orange';
      textColor = 'white';
    } else {
      bgColor = 'black';
      textColor = 'white';
    }

    const annotation = {      
      id: 'annotation-' + index,  // Assign a unique id to each annotation      
      point: { xAxis: 0, yAxis: 0, x: time + index * 1000, y: price }, // Add a small offset based on index
      text: 'Id:'+ alarm.id + ' Index:' + index,
      backgroundColor: bgColor,
      borderColor: bgColor,      
      borderRadius: 3,
      borderWidth: 1,
      style: {
        color: textColor
      },
      draggable: true // Add this line to make the annotation draggable
    };

    annotations.push(annotation);
  });

  return annotations;
};