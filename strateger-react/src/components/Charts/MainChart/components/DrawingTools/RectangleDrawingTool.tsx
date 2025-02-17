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
