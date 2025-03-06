// Archivo: DrawingTools.tsx

import {	
	IPrimitivePaneView,	
	Time
} from 'lightweight-charts';

//! =====================================================
//! -------- Common Interfaces for Drawing Tools --------
//! =====================================================

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
	paneViews(): IPrimitivePaneView[];
}


