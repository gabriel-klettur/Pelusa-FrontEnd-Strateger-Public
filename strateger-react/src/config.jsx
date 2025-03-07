export const config = {
  apiURL: process.env.REACT_APP_MODE_DEVELOPING?.toLowerCase() === 'true'
    ? 'http://192.168.1.2:8000'
    : 'https://api.beelzebot.com:8000',
  apiUrlWS: process.env.REACT_APP_MODE_DEVELOPING?.toLowerCase() === 'true'
    ? 'ws://192.168.1.2:8000'
    : 'wss://api.beelzebot.com:8000',
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


