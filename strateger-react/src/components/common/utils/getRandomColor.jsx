// Path: strateger-react/src/components/Account/AccountCharts/generateRandomColor.jsx

// Función para generar colores hexadecimales válidos
const getRandomColor = () => {
    let color = '#' + Math.floor(Math.random() * 16777215).toString(16);
    while (color.length < 7) {
      color += '0';
    }
    return color;
  };
  
  export default getRandomColor;
  