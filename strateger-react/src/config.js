export const config = {
  apiURL: process.env.REACT_APP_MODE_DEVELOPING?.toLowerCase() === 'true'
    ? 'http://127.0.0.1:8000'
    : 'https://api.beelzebot.com:8000',
};

export const eviromentDetection = () => {
  if (process.env.REACT_APP_MODE_DEVELOPING?.toLowerCase() === 'true') {
    console.log(
      '%cCompiled successfully in Development mode!',
      'color: green; font-weight: bold; font-size: 16px;'
    );
  } else {
    console.log(
      '%cCompiled successfully in Production mode!',
      'color: blue; font-weight: bold; font-size: 16px;'
    );
  }  
};


