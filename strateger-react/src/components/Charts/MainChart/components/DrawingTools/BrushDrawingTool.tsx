import {
	ISeriesApi,
	IChartApi,
	ISeriesPrimitivePaneRenderer,
	ISeriesPrimitivePaneView,
	SeriesType,	
} from 'lightweight-charts';
import { CanvasRenderingTarget2D } from 'fancy-canvas';


import { IPoint, IPointCoordinates } from './DrawingTools';
import { IDrawingTool } from './DrawingTools';

// =====================================================
// 5️⃣ Herramienta de Dibujo con Brocha (trazo libre)
// =====================================================

export interface IBrush {
	points: IPoint[]; // Lista de puntos en orden para formar el trazo
}

class BrushPaneRenderer implements ISeriesPrimitivePaneRenderer {
	private _points: IPointCoordinates[];
	private _color: string;
	private _lineWidth: number;
	private _opacity: number;

	constructor(points: IPointCoordinates[], color: string, lineWidth: number, opacity: number) {
		this._points = points;
		this._color = color;
		this._lineWidth = lineWidth;
		this._opacity = opacity;
	}

	draw(target: CanvasRenderingTarget2D): void {
		target.useBitmapCoordinateSpace((scope: any) => {
			// Nos aseguramos de que haya al menos dos puntos
			const validPoints = this._points.filter(p => p.x !== null && p.y !== null) as { x: number; y: number }[];
			if (validPoints.length < 2) return;

			const ctx = scope.context as CanvasRenderingContext2D;
			ctx.save();
			ctx.globalAlpha = this._opacity;
			ctx.beginPath();
			ctx.moveTo(validPoints[0].x, validPoints[0].y);
			for (let i = 1; i < validPoints.length; i++) {
				ctx.lineTo(validPoints[i].x, validPoints[i].y);
			}
			ctx.strokeStyle = this._color;
			ctx.lineWidth = this._lineWidth;
			ctx.stroke();
			ctx.restore();
		});
	}
}

class BrushPaneView implements ISeriesPrimitivePaneView {
	private _source: BrushDrawingTool;
	private _points: IPointCoordinates[] = [];

	constructor(source: BrushDrawingTool) {
		this._source = source;
	}

	update(): void {
		const series = this._source.series;
		const chart = this._source.chart;
		const visibleRange = chart.timeScale().getVisibleRange();
		if (!visibleRange) return;

		this._points = this._source.brush.points.map(point => {
			let adjustedTime = point.time;
			if (adjustedTime < visibleRange.from) {
				adjustedTime = visibleRange.from;
			} else if (adjustedTime > visibleRange.to) {
				adjustedTime = visibleRange.to;
			}
			const x = chart.timeScale().timeToCoordinate(adjustedTime);
			const y = series.priceToCoordinate(point.price);
			return { x, y };
		});
	}

	renderer(): ISeriesPrimitivePaneRenderer {
		return new BrushPaneRenderer(this._points, this._source.color, this._source.lineWidth, this._source.opacity);
	}
}

export class BrushDrawingTool implements IDrawingTool {
	public chart: IChartApi;
	public series: ISeriesApi<SeriesType>;
	public brush: IBrush;
	public color: string;
	public lineWidth: number;
	public opacity: number;
	private _paneViews: BrushPaneView[];

	constructor(
		chart: IChartApi,
		series: ISeriesApi<SeriesType>,
		brush: IBrush,
		color: string = 'orange',
		lineWidth: number = 2,
		opacity: number = 1.0
	) {
		this.chart = chart;
		this.series = series;
		this.brush = brush;
		this.color = color;
		this.lineWidth = lineWidth;
		this.opacity = opacity;
		this._paneViews = [new BrushPaneView(this)];
	}

	// Permite agregar puntos al trazo (por ejemplo, al mover el mouse)
	addPoint(newPoint: IPoint): void {
		this.brush.points.push(newPoint);
		this._paneViews.forEach(view => view.update());
	}

	updateBrush(newBrush: IBrush): void {
		this.brush = newBrush;
		this._paneViews.forEach(view => view.update());
	}

	paneViews(): ISeriesPrimitivePaneView[] {
		return this._paneViews;
	}
}
