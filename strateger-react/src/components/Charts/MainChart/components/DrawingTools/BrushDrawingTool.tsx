// Path: strateger-react/src/components/DrawingTools/BrushDrawingTool.tsx

import { 
	ISeriesApi, 
	IChartApi, 
	IPrimitivePaneRenderer, 
	IPrimitivePaneView, 
	SeriesType, 
	Time 
  } from 'lightweight-charts';

import { CanvasRenderingTarget2D } from 'fancy-canvas';
  
/**
 * IPoint: Represent a point in time/price coordinates.
 */
export interface IPoint {
	time: Time;
	price: number;
}
/**
 * IBrushSegment: Represent a segment of the brush in time/price coordinates.
 */
export interface IBrushSegment {
	start: IPoint;
	end: IPoint;
}
  
/**
 * IComputedBrushSegment: Represent a segment of the brush in pixel coordinates.
 */
interface IComputedBrushSegment {
	startX: number | null;
	startY: number | null;
	endX: number | null;
	endY: number | null;
}
  
//!----------------------------------------------------------------------------------------------------------------------------------------
//!-------------------------------------------------  Draw a Segment in Canvas ------------------------------------------------------------
//!----------------------------------------------------------------------------------------------------------------------------------------
class BrushPaneRenderer implements IPrimitivePaneRenderer {
	private _segments: IComputedBrushSegment[];
	private _color: string;
	private _lineWidth: number;
	private _opacity: number;

	constructor(segments: IComputedBrushSegment[], color: string, lineWidth: number, opacity: number) {
		this._segments = segments;
		this._color = color;
		this._lineWidth = lineWidth;
		this._opacity = opacity;	  
	}

	draw(target: CanvasRenderingTarget2D): void {	  
		target.useBitmapCoordinateSpace((scope: any) => {
			const ctx = scope.context as CanvasRenderingContext2D;			//!<-- This is the key to access the canvas context
			ctx.save();
			ctx.globalAlpha = this._opacity;
			ctx.strokeStyle = this._color;
			ctx.lineWidth = this._lineWidth;
			ctx.beginPath();
			for (const seg of this._segments) {
				if (seg.startX !== null && seg.startY !== null && seg.endX !== null && seg.endY !== null) {
				ctx.moveTo(seg.startX, seg.startY);
				ctx.lineTo(seg.endX, seg.endY);
				}
			}
			ctx.stroke();
			ctx.restore();		
		});
	}
}

//!----------------------------------------------------------------------------------------------------------------------------------------
//!---------------------------------------- Compute the segments in pixel coordinates -----------------------------------------------------
//!----------------------------------------------------------------------------------------------------------------------------------------

class BrushPaneView implements IPrimitivePaneView {
	private _source: BrushDrawingTool;
	private _computedSegments: IComputedBrushSegment[] = [];

	constructor(source: BrushDrawingTool) {
		this._source = source;	  
	}

	update(): void {
		const chart = this._source.chart;
		const series = this._source.series;

		if (!chart || !series) {
			console.warn("⚠️ [BrushPaneView] No se puede actualizar: el gráfico o la serie han sido eliminados.");
			return;
		}

		this._computedSegments = this._source.segments.map(seg => {
			const startX = chart.timeScale().timeToCoordinate(seg.start.time);
			const startY = series.priceToCoordinate(seg.start.price);
			const endX = chart.timeScale().timeToCoordinate(seg.end.time);
			const endY = series.priceToCoordinate(seg.end.price);

			if (startX === null || startY === null || endX === null || endY === null) {
			console.warn("⚠️ [BrushPaneView] Coordenadas inválidas, ignorando segmento.");
			return { startX: null, startY: null, endX: null, endY: null };
			}

			return { startX, startY, endX, endY };
		}).filter(segment => segment.startX !== null && segment.startY !== null);
	}

	renderer(): IPrimitivePaneRenderer {	  
		return new BrushPaneRenderer(this._computedSegments, this._source.color, this._source.lineWidth, this._source.opacity);
	}
}
  

//!----------------------------------------------------------------------------------------------------------------------------------------
//!--------------------------------  Main class, manages the brush logic and its update ---------------------------------------------------
//!----------------------------------------------------------------------------------------------------------------------------------------
export class BrushDrawingTool {
	public chart: IChartApi;
	public series: ISeriesApi<SeriesType>;
	public segments: IBrushSegment[];
	public color: string;
	public lineWidth: number;
	public opacity: number;
	private _paneViews: BrushPaneView[];

	constructor(
		chart: IChartApi,
		series: ISeriesApi<SeriesType>,
		start: IPoint,
		end: IPoint,
		color: string = 'black',
		lineWidth: number = 3,
		opacity: number = 1.0
	) {
		this.chart = chart;
		this.series = series;		
		this.segments = [{ start, end }];
		this.color = color;
		this.lineWidth = lineWidth;
		this.opacity = opacity;
		this._paneViews = [new BrushPaneView(this)];
		
		this.updateBrush();	
	}

	/**
	 * Add a new segment to the brush.
	 * @param start Initial point of the segment.
	 * @param end End point of the segment.
	 */
	addSegment(start: IPoint, end: IPoint): void {
		this.segments.push({ start, end });
		this._paneViews.forEach(view => view.update());		
	}

	/**
	 * Update each segment in the brush.
	 */
	updateBrush(): void {
		this._paneViews.forEach(view => view.update());
		if (!this.chart || !this.series) {
		console.warn("⚠️ [BrushDrawingTool] The chart or the series has been removed, the brush cannot be updated.");
		return;
		}
	}

	paneViews(): IPrimitivePaneView[] {
		return this.chart ? this._paneViews : [];
	}
}
