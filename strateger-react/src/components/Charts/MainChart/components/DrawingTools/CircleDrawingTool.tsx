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
