const config = {
  apiURL: process.env.REACT_APP_MODE_DEVELOPING?.toLowerCase() === 'true'
    ? 'http://127.0.0.1:8000'
    : 'https://api.beelzebot.com:8000',
};

export default config;
