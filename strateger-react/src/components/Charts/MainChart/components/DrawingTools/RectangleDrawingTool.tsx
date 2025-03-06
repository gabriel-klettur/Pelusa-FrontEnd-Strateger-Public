import { 
    ISeriesApi, 
    IChartApi, 
    IPrimitivePaneRenderer, 
    IPrimitivePaneView, 
    SeriesType, 
    Time 
  } from 'lightweight-charts';

import { CanvasRenderingTarget2D } from 'fancy-canvas';  
export interface IPoint {
  time: Time;
  price: number;
}
interface IRectangleCoordinates {
  x: number | null;
  y: number | null;
  width: number | null;
  height: number | null;
}
  
//!----------------------------------------------------------------------------------------------------------------------------------------
//!--------------------------------------------------  Draw a Rectangle in Canvas ---------------------------------------------------------
//!----------------------------------------------------------------------------------------------------------------------------------------
  
class RectanglePaneRenderer implements IPrimitivePaneRenderer {
  private _coords: IRectangleCoordinates;
  private _color: string;
  private _lineWidth: number;
  private _opacity: number;
  private _fill?: string;

  constructor(
    coords: IRectangleCoordinates, 
    color: string, 
    lineWidth: number, 
    opacity: number, 
    fill?: string
  ) {
    this._coords = coords;
    this._color = color;
    this._lineWidth = lineWidth;
    this._opacity = opacity;
    this._fill = fill;
  }

  draw(target: CanvasRenderingTarget2D): void {
    target.useBitmapCoordinateSpace((scope: any) => {
      const { x, y, width, height } = this._coords;
      if (x === null || y === null || width === null || height === null) {        
        return;
      }
      const ctx = scope.context as CanvasRenderingContext2D;      //!<-- This is the key to access the canvas context
      ctx.save();
      ctx.globalAlpha = this._opacity;      
      if (this._fill) {
        ctx.fillStyle = this._fill;
        ctx.fillRect(x, y, width, height);
      }
      ctx.strokeStyle = this._color;
      ctx.lineWidth = this._lineWidth;
      ctx.strokeRect(x, y, width, height);
      ctx.restore();
    });
  }
}
  
//!----------------------------------------------------------------------------------------------------------------------------------------
//!--------------------------------------------------  Compute the position of the rectangle in the chart ---------------------------------
//!----------------------------------------------------------------------------------------------------------------------------------------

class RectanglePaneView implements IPrimitivePaneView {
  private _source: RectangleDrawingTool;
  private _coords: IRectangleCoordinates = { x: null, y: null, width: null, height: null };

  constructor(source: RectangleDrawingTool) {
    this._source = source;
  }
  
  update(): void {
    const chart = this._source.chart;
    const series = this._source.series;
    const { start, end } = this._source;

    if (!chart || !series) {
      console.warn("⚠️ [RectanglePaneView] Its not possible to update the rectangle: the chart has been removed.");
      return;
    }

    const x1 = chart.timeScale().timeToCoordinate(start.time);
    const y1 = series.priceToCoordinate(start.price);
    const x2 = chart.timeScale().timeToCoordinate(end.time);
    const y2 = series.priceToCoordinate(end.price);

    if (x1 === null || y1 === null || x2 === null || y2 === null) {
      console.warn("⚠️ [RectanglePaneView] Wrong coordinates: ", { x1, y1, x2, y2 });
      return;
    }

    const x = (x1 !== null && x2 !== null) ? Math.min(x1, x2) : null;
    const y = (y1 !== null && y2 !== null) ? Math.min(y1, y2) : null;
    const width = (x1 !== null && x2 !== null) ? Math.abs(x2 - x1) : null;
    const height = (y1 !== null && y2 !== null) ? Math.abs(y2 - y1) : null;
    this._coords = { x, y, width, height };
  }

  renderer(): IPrimitivePaneRenderer {
    return new RectanglePaneRenderer(
      this._coords,
      this._source.color,
      this._source.lineWidth,
      this._source.opacity,
      this._source.fill
    );
  }
}

//!----------------------------------------------------------------------------------------------------------------------------------------
//!--------------------------------------------------  Main Class to manage the rectangle and its update ----------------------------------
//!----------------------------------------------------------------------------------------------------------------------------------------

export class RectangleDrawingTool {
  public chart: IChartApi;
  public series: ISeriesApi<SeriesType>;
  public start: IPoint;
  public end: IPoint;
  public color: string;
  public lineWidth: number;
  public opacity: number;
  public fill?: string;
  private _paneViews: RectanglePaneView[];

  constructor(
    chart: IChartApi,
    series: ISeriesApi<SeriesType>,
    start: IPoint,
    end: IPoint,
    color: string = 'red',
    lineWidth: number = 2,
    opacity: number = 1.0,
    fill?: string
  ) {
    this.chart = chart;
    this.series = series;
    this.start = start;
    this.end = end;
    this.color = color;
    this.lineWidth = lineWidth;
    this.opacity = opacity;
    this.fill = fill;
    this._paneViews = [new RectanglePaneView(this)];
    
    this.updateRectangle(this.start, this.end);
  }
  
  updateRectangle(newStart: IPoint, newEnd: IPoint): void {
    if (!this.chart || !this.series) {
      console.warn("⚠️ [LineDrawingTool] Its not possible to update the rectangle: the chart has been removed.");
      return;
    }
    this.start = newStart;
    this.end = newEnd;
    this._paneViews.forEach((paneView) => paneView.update());
  }

  paneViews(): IPrimitivePaneView[] {
    return this.chart ? this._paneViews : [];
  }
}
  