//Path: strateger-react/src/setupTests.js

import '@testing-library/jest-dom'; //! Provides custom jest matchers for Jest. These matchers are provided additional methods to make assertions in tests (On the state of the DOM elements). 
import 'jest-canvas-mock';

// Simulación de HTMLCanvasElement.prototype.getContext
HTMLCanvasElement.prototype.getContext = jest.fn((type) => {
    if (type === '2d') {
      return {
        fillRect: jest.fn(),
        clearRect: jest.fn(),
        getImageData: jest.fn(),
        putImageData: jest.fn(),
        createImageData: jest.fn(),
        setTransform: jest.fn(),
        drawImage: jest.fn(),
        save: jest.fn(),
        fillText: jest.fn(),
        restore: jest.fn(),
        beginPath: jest.fn(),
        moveTo: jest.fn(),
        lineTo: jest.fn(),
        closePath: jest.fn(),
        stroke: jest.fn(),
        translate: jest.fn(),
        scale: jest.fn(),
        rotate: jest.fn(),
        arc: jest.fn(),
        fill: jest.fn(),
        measureText: jest.fn(() => ({ width: 0 })),
        transform: jest.fn(),
        rect: jest.fn(),
        clip: jest.fn(),
      };
    }
    return null;
  });
  