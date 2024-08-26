const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Alias '@' apuntando a la carpeta 'src'
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // Permite resolver estas extensiones sin especificarlas
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/, // Para archivos JS, JSX, TS, y TSX
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // O 'ts-loader' si estás usando TypeScript sin Babel
        },
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  entry: './src/index.js', // Punto de entrada de tu aplicación
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
};
