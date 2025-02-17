// Archivo: DrawingTools.tsx

import {	
	ISeriesPrimitivePaneView,	
	Time
} from 'lightweight-charts';

// =====================================================
// Interfaces comunes para puntos y coordenadas
// =====================================================

export interface IPoint {
	time: Time;
	price: number;
}

export interface IPointCoordinates {
	x: number | null;
	y: number | null;
}

// Una interfaz base para nuestros drawing tools
export interface IDrawingTool {
	paneViews(): ISeriesPrimitivePaneView[];
}


