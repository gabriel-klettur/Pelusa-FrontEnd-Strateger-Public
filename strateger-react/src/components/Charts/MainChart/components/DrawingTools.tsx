// Archivo: DrawingTools.tsx

import {
	ISeriesApi,
	IChartApi,
	ISeriesPrimitivePaneRenderer,
	ISeriesPrimitivePaneView,
	SeriesType,
	Time
} from 'lightweight-charts';
import { CanvasRenderingTarget2D } from 'fancy-canvas';

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

// =====================================================
// 1️⃣ Herramienta de Dibujo de Punto (ya existente)
// =====================================================

class PointPaneRenderer implements ISeriesPrimitivePaneRenderer {
	private _point: IPointCoordinates;
	private _color: string;
	private _radius: number;
	private _opacity: number;

	constructor(point: IPointCoordinates, color: string, radius: number, opacity: number) {
		this._point = point;
		this._color = color;
		this._radius = radius;
		this._opacity = opacity;
	}

	draw(target: CanvasRenderingTarget2D): void {
		target.useBitmapCoordinateSpace((scope: any) => {
			if (this._point.x === null || this._point.y === null) {
				console.log("❌ [PointPaneRenderer] Cannot draw: Null coordinates", this._point);
				return;
			}
			const ctx = scope.context as CanvasRenderingContext2D;
			ctx.save();
			ctx.globalAlpha = this._opacity;
			ctx.beginPath();
			ctx.arc(this._point.x, this._point.y, this._radius, 0, 2 * Math.PI);
			ctx.fillStyle = this._color;
			ctx.fill();
			ctx.strokeStyle = this._color;
			ctx.lineWidth = 3;
			ctx.stroke();
			ctx.restore();
		});
	}
}

class PointPaneView implements ISeriesPrimitivePaneView {
	private _source: PointDrawingTool;
	private _point: IPointCoordinates = { x: null, y: null };

	constructor(source: PointDrawingTool) {
		this._source = source;
	}

	update(): void {
		const series = this._source.series;
		const chart = this._source.chart;
		const visibleRange = chart.timeScale().getVisibleRange();
		if (!visibleRange) return;

		// Ajustamos el time en caso de que esté fuera de la vista
		let adjustedTime = this._source.point.time;
		if (adjustedTime < visibleRange.from) {
			adjustedTime = visibleRange.from;
		} else if (adjustedTime > visibleRange.to) {
			adjustedTime = visibleRange.to;
		}

		const x = chart.timeScale().timeToCoordinate(adjustedTime);
		const y = series.priceToCoordinate(this._source.point.price);
		this._point = { x, y };
	}

	renderer(): ISeriesPrimitivePaneRenderer {
		return new PointPaneRenderer(this._point, this._source.color, this._source.radius, this._source.opacity);
	}
}

export class PointDrawingTool implements IDrawingTool {
	public chart: IChartApi;
	public series: ISeriesApi<SeriesType>;
	public point: IPoint;
	public color: string;
	public radius: number;
	public opacity: number;
	private _paneViews: PointPaneView[];

	constructor(
		chart: IChartApi,
		series: ISeriesApi<SeriesType>,
		point: IPoint,
		color: string = 'red',
		radius: number = 15,
		opacity: number = 0.5
	) {
		this.chart = chart;
		this.series = series;
		this.point = point;
		this.color = color;
		this.radius = radius;
		this.opacity = opacity;
		this._paneViews = [new PointPaneView(this)];
	}

	updatePoint(newPoint: IPoint): void {
		this.point = newPoint;
		this._paneViews.forEach((paneView) => paneView.update());
	}

	paneViews(): ISeriesPrimitivePaneView[] {
		return this._paneViews;
	}
}

// =====================================================
// 2️⃣ Herramienta de Dibujo de Línea
// =====================================================

export interface ILine {
	start: IPoint;
	end: IPoint;
}

class LinePaneRenderer implements ISeriesPrimitivePaneRenderer {
	private _start: IPointCoordinates;
	private _end: IPointCoordinates;
	private _color: string;
	private _lineWidth: number;
	private _opacity: number;

	constructor(start: IPointCoordinates, end: IPointCoordinates, color: string, lineWidth: number, opacity: number) {
		this._start = start;
		this._end = end;
		this._color = color;
		this._lineWidth = lineWidth;
		this._opacity = opacity;
	}

	draw(target: CanvasRenderingTarget2D): void {
		target.useBitmapCoordinateSpace((scope: any) => {
			if (this._start.x === null || this._start.y === null || this._end.x === null || this._end.y === null) {
				console.log("❌ [LinePaneRenderer] Invalid coordinates", this._start, this._end);
				return;
			}
			const ctx = scope.context as CanvasRenderingContext2D;
			ctx.save();
			ctx.globalAlpha = this._opacity;
			ctx.beginPath();
			ctx.moveTo(this._start.x, this._start.y);
			ctx.lineTo(this._end.x, this._end.y);
			ctx.strokeStyle = this._color;
			ctx.lineWidth = this._lineWidth;
			ctx.stroke();
			ctx.restore();
		});
	}
}

class LinePaneView implements ISeriesPrimitivePaneView {
	private _source: LineDrawingTool;
	private _start: IPointCoordinates = { x: null, y: null };
	private _end: IPointCoordinates = { x: null, y: null };

	constructor(source: LineDrawingTool) {
		this._source = source;
	}

	update(): void {
		const series = this._source.series;
		const chart = this._source.chart;
		const visibleRange = chart.timeScale().getVisibleRange();
		if (!visibleRange) return;

		// Aseguramos que los tiempos estén dentro del rango visible
		let adjustedStartTime = this._source.line.start.time;
		let adjustedEndTime = this._source.line.end.time;
		if (adjustedStartTime < visibleRange.from) {
			adjustedStartTime = visibleRange.from;
		} else if (adjustedStartTime > visibleRange.to) {
			adjustedStartTime = visibleRange.to;
		}
		if (adjustedEndTime < visibleRange.from) {
			adjustedEndTime = visibleRange.from;
		} else if (adjustedEndTime > visibleRange.to) {
			adjustedEndTime = visibleRange.to;
		}

		const startX = chart.timeScale().timeToCoordinate(adjustedStartTime);
		const startY = series.priceToCoordinate(this._source.line.start.price);
		const endX = chart.timeScale().timeToCoordinate(adjustedEndTime);
		const endY = series.priceToCoordinate(this._source.line.end.price);
		this._start = { x: startX, y: startY };
		this._end = { x: endX, y: endY };
	}

	renderer(): ISeriesPrimitivePaneRenderer {
		return new LinePaneRenderer(this._start, this._end, this._source.color, this._source.lineWidth, this._source.opacity);
	}
}

export class LineDrawingTool implements IDrawingTool {
	public chart: IChartApi;
	public series: ISeriesApi<SeriesType>;
	public line: ILine;
	public color: string;
	public lineWidth: number;
	public opacity: number;
	private _paneViews: LinePaneView[];

	constructor(
		chart: IChartApi,
		series: ISeriesApi<SeriesType>,
		line: ILine,
		color: string = 'blue',
		lineWidth: number = 2,
		opacity: number = 1.0
	) {
		this.chart = chart;
		this.series = series;
		this.line = line;
		this.color = color;
		this.lineWidth = lineWidth;
		this.opacity = opacity;
		this._paneViews = [new LinePaneView(this)];
	}

	updateLine(newLine: ILine): void {
		this.line = newLine;
		this._paneViews.forEach(view => view.update());
	}

	paneViews(): ISeriesPrimitivePaneView[] {
		return this._paneViews;
	}
}

// =====================================================
// 3️⃣ Herramienta de Dibujo de Rectángulo (o cuadrado)
// =====================================================

export interface IRectangle {
	start: IPoint; // Esquina 1
	end: IPoint;   // Esquina opuesta
}

class RectanglePaneRenderer implements ISeriesPrimitivePaneRenderer {
	private _start: IPointCoordinates;
	private _end: IPointCoordinates;
	private _color: string;
	private _lineWidth: number;
	private _opacity: number;
	private _fill: boolean;

	constructor(
		start: IPointCoordinates,
		end: IPointCoordinates,
		color: string,
		lineWidth: number,
		opacity: number,
		fill: boolean = false
	) {
		this._start = start;
		this._end = end;
		this._color = color;
		this._lineWidth = lineWidth;
		this._opacity = opacity;
		this._fill = fill;
	}

	draw(target: CanvasRenderingTarget2D): void {
		target.useBitmapCoordinateSpace((scope: any) => {
			if (this._start.x === null || this._start.y === null || this._end.x === null || this._end.y === null) {
				console.log("❌ [RectanglePaneRenderer] Invalid coordinates", this._start, this._end);
				return;
			}
			const ctx = scope.context as CanvasRenderingContext2D;
			ctx.save();
			ctx.globalAlpha = this._opacity;
			const x = Math.min(this._start.x, this._end.x);
			const y = Math.min(this._start.y, this._end.y);
			const width = Math.abs(this._end.x - this._start.x);
			const height = Math.abs(this._end.y - this._start.y);
			if (this._fill) {
				ctx.fillStyle = this._color;
				ctx.fillRect(x, y, width, height);
			} else {
				ctx.strokeStyle = this._color;
				ctx.lineWidth = this._lineWidth;
				ctx.strokeRect(x, y, width, height);
			}
			ctx.restore();
		});
	}
}

class RectanglePaneView implements ISeriesPrimitivePaneView {
	private _source: RectangleDrawingTool;
	private _start: IPointCoordinates = { x: null, y: null };
	private _end: IPointCoordinates = { x: null, y: null };

	constructor(source: RectangleDrawingTool) {
		this._source = source;
	}

	update(): void {
		const series = this._source.series;
		const chart = this._source.chart;
		const visibleRange = chart.timeScale().getVisibleRange();
		if (!visibleRange) return;

		let adjustedStartTime = this._source.rect.start.time;
		let adjustedEndTime = this._source.rect.end.time;
		if (adjustedStartTime < visibleRange.from) {
			adjustedStartTime = visibleRange.from;
		} else if (adjustedStartTime > visibleRange.to) {
			adjustedStartTime = visibleRange.to;
		}
		if (adjustedEndTime < visibleRange.from) {
			adjustedEndTime = visibleRange.from;
		} else if (adjustedEndTime > visibleRange.to) {
			adjustedEndTime = visibleRange.to;
		}

		const startX = chart.timeScale().timeToCoordinate(adjustedStartTime);
		const startY = series.priceToCoordinate(this._source.rect.start.price);
		const endX = chart.timeScale().timeToCoordinate(adjustedEndTime);
		const endY = series.priceToCoordinate(this._source.rect.end.price);
		this._start = { x: startX, y: startY };
		this._end = { x: endX, y: endY };
	}

	renderer(): ISeriesPrimitivePaneRenderer {
		return new RectanglePaneRenderer(this._start, this._end, this._source.color, this._source.lineWidth, this._source.opacity, this._source.fill);
	}
}

export class RectangleDrawingTool implements IDrawingTool {
	public chart: IChartApi;
	public series: ISeriesApi<SeriesType>;
	public rect: IRectangle;
	public color: string;
	public lineWidth: number;
	public opacity: number;
	public fill: boolean;
	private _paneViews: RectanglePaneView[];

	constructor(
		chart: IChartApi,
		series: ISeriesApi<SeriesType>,
		rect: IRectangle,
		color: string = 'green',
		lineWidth: number = 2,
		opacity: number = 1.0,
		fill: boolean = false
	) {
		this.chart = chart;
		this.series = series;
		this.rect = rect;
		this.color = color;
		this.lineWidth = lineWidth;
		this.opacity = opacity;
		this.fill = fill;
		this._paneViews = [new RectanglePaneView(this)];
	}

	updateRectangle(newRect: IRectangle): void {
		this.rect = newRect;
		this._paneViews.forEach(view => view.update());
	}

	paneViews(): ISeriesPrimitivePaneView[] {
		return this._paneViews;
	}
}

// =====================================================
// 4️⃣ Herramienta de Dibujo de Círculo
// =====================================================

export interface ICircle {
	center: IPoint;
	edge: IPoint; // Se usa para calcular el radio
}

class CirclePaneRenderer implements ISeriesPrimitivePaneRenderer {
	private _center: IPointCoordinates;
	private _edge: IPointCoordinates;
	private _color: string;
	private _lineWidth: number;
	private _opacity: number;
	private _fill: boolean;

	constructor(
		center: IPointCoordinates,
		edge: IPointCoordinates,
		color: string,
		lineWidth: number,
		opacity: number,
		fill: boolean = false
	) {
		this._center = center;
		this._edge = edge;
		this._color = color;
		this._lineWidth = lineWidth;
		this._opacity = opacity;
		this._fill = fill;
	}

	draw(target: CanvasRenderingTarget2D): void {
		target.useBitmapCoordinateSpace((scope: any) => {
			if (
				this._center.x === null ||
				this._center.y === null ||
				this._edge.x === null ||
				this._edge.y === null
			) {
				console.log("❌ [CirclePaneRenderer] Invalid coordinates", this._center, this._edge);
				return;
			}
			const ctx = scope.context as CanvasRenderingContext2D;
			ctx.save();
			ctx.globalAlpha = this._opacity;
			const dx = this._edge.x - this._center.x;
			const dy = this._edge.y - this._center.y;
			const radius = Math.sqrt(dx * dx + dy * dy);
			ctx.beginPath();
			ctx.arc(this._center.x, this._center.y, radius, 0, 2 * Math.PI);
			if (this._fill) {
				ctx.fillStyle = this._color;
				ctx.fill();
			} else {
				ctx.strokeStyle = this._color;
				ctx.lineWidth = this._lineWidth;
				ctx.stroke();
			}
			ctx.restore();
		});
	}
}

class CirclePaneView implements ISeriesPrimitivePaneView {
	private _source: CircleDrawingTool;
	private _center: IPointCoordinates = { x: null, y: null };
	private _edge: IPointCoordinates = { x: null, y: null };

	constructor(source: CircleDrawingTool) {
		this._source = source;
	}

	update(): void {
		const series = this._source.series;
		const chart = this._source.chart;
		const visibleRange = chart.timeScale().getVisibleRange();
		if (!visibleRange) return;

		let adjustedCenterTime = this._source.circle.center.time;
		let adjustedEdgeTime = this._source.circle.edge.time;
		if (adjustedCenterTime < visibleRange.from) {
			adjustedCenterTime = visibleRange.from;
		} else if (adjustedCenterTime > visibleRange.to) {
			adjustedCenterTime = visibleRange.to;
		}
		if (adjustedEdgeTime < visibleRange.from) {
			adjustedEdgeTime = visibleRange.from;
		} else if (adjustedEdgeTime > visibleRange.to) {
			adjustedEdgeTime = visibleRange.to;
		}

		const centerX = chart.timeScale().timeToCoordinate(adjustedCenterTime);
		const centerY = series.priceToCoordinate(this._source.circle.center.price);
		const edgeX = chart.timeScale().timeToCoordinate(adjustedEdgeTime);
		const edgeY = series.priceToCoordinate(this._source.circle.edge.price);
		this._center = { x: centerX, y: centerY };
		this._edge = { x: edgeX, y: edgeY };
	}

	renderer(): ISeriesPrimitivePaneRenderer {
		return new CirclePaneRenderer(
			this._center,
			this._edge,
			this._source.color,
			this._source.lineWidth,
			this._source.opacity,
			this._source.fill
		);
	}
}

export class CircleDrawingTool implements IDrawingTool {
	public chart: IChartApi;
	public series: ISeriesApi<SeriesType>;
	public circle: ICircle;
	public color: string;
	public lineWidth: number;
	public opacity: number;
	public fill: boolean;
	private _paneViews: CirclePaneView[];

	constructor(
		chart: IChartApi,
		series: ISeriesApi<SeriesType>,
		circle: ICircle,
		color: string = 'purple',
		lineWidth: number = 2,
		opacity: number = 1.0,
		fill: boolean = false
	) {
		this.chart = chart;
		this.series = series;
		this.circle = circle;
		this.color = color;
		this.lineWidth = lineWidth;
		this.opacity = opacity;
		this.fill = fill;
		this._paneViews = [new CirclePaneView(this)];
	}

	updateCircle(newCircle: ICircle): void {
		this.circle = newCircle;
		this._paneViews.forEach(view => view.update());
	}

	paneViews(): ISeriesPrimitivePaneView[] {
		return this._paneViews;
	}
}

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
