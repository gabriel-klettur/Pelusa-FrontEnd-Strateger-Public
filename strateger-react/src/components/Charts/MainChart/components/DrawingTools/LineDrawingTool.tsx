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