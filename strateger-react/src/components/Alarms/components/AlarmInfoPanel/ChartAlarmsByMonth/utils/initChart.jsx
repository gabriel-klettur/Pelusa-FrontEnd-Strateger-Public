export const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Alarms catched by Month and Interval',
        color: 'white', 
      },
      legend: {
        labels: {
          color: 'white', 
        },
      },
      tooltip: {
        bodyColor: 'white', 
      },
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: 'white', // Cambia el color de las etiquetas del eje X a blanco
        },
      },
      y: {
        stacked: true,
        ticks: {
          color: 'white', // Cambia el color de las etiquetas del eje Y a blanco
        },     
      },
    },
};

export const getColorForInterval = (interval) => {
    const colors = {
      '5m': 'rgb(102, 153, 255)',     // Azul claro
      '15m': 'rgb(255, 153, 102)',    // Naranja claro
      '30m': 'rgb(102, 255, 178)',    // Verde claro
      '1h': 'rgb(255, 102, 102)',     // Rojo claro
      '4h': 'rgb(255, 178, 102)',     // Amarillo anaranjado
      'D': 'rgb(153, 102, 255)',      // Violeta claro
      'W': 'rgb(255, 255, 102)',      // Amarillo pastel
      'M': 'rgb(153, 204, 255)',      // Azul pastel
    };
    
    return colors[interval] || 'gray';
};