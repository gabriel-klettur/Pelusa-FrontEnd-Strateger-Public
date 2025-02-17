import {
	ISeriesApi,
	IChartApi,
	IPrimitivePaneRenderer,
	IPrimitivePaneView,
	SeriesType,	
} from 'lightweight-charts';
import { CanvasRenderingTarget2D } from 'fancy-canvas';

import { IPoint, IPointCoordinates } from './DrawingTools';
import { IDrawingTool } from './DrawingTools';

// =====================================================
// 1️⃣ Herramienta de Dibujo de Punto (ya existente)
// =====================================================

class PointPaneRenderer implements IPrimitivePaneRenderer {
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

class PointPaneView implements IPrimitivePaneView {
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

    renderer(): IPrimitivePaneRenderer {
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

    paneViews(): IPrimitivePaneView[] {
        return this._paneViews;
    }
}
