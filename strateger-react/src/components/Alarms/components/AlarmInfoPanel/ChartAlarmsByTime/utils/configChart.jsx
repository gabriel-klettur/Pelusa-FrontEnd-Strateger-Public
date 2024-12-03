export const radarOptions = {
    responsive: true, // El gráfico se adapta al contenedor
    maintainAspectRatio: false, // El gráfico no mantiene la relación de aspecto
    plugins: {
      title: {
        display: true,
        text: 'Alarm Distribution by Hour', // Título del gráfico
        color: 'white', // Color del texto del título
        font: {
          size: 18, // Tamaño del texto
        },
      },
      legend: {
        labels: {
          color: 'white', // Color de las etiquetas de la leyenda
          font: {
            size: 12, // Tamaño del texto de la leyenda
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.7)', // Fondo del tooltip
        titleColor: 'white', // Color del título en el tooltip
        bodyColor: 'white', // Color del cuerpo en el tooltip
        borderColor: 'rgba(255, 255, 255, 0.5)', // Borde del tooltip
        borderWidth: 1, // Grosor del borde
      },
    },
    scales: {
      r: {
        angleLines: {
          color: 'rgba(255, 255, 255, 0.5)', // Líneas que conectan los puntos al centro
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)', // Líneas de la grilla circular
        },
        pointLabels: {
          color: 'white', // Color de las etiquetas en los ejes radiales
          font: {
            size: 14, // Tamaño de las etiquetas de las métricas
          },
        },
        ticks: {
          display: true, // Mostrar los valores de los ticks (radios)
          color: 'white', // Color de los valores
          backdropColor: 'transparent', // Fondo transparente detrás de los ticks
          font: {
            size: 10, // Tamaño del texto de los ticks
          },
        },
      },
    },
  };