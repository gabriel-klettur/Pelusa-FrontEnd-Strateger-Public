// Path: strateger-react/src/components/Charts/MainChart/components/LineDrawingTool.tsx
import { 
  ISeriesApi, 
  IChartApi, 
  IPrimitivePaneRenderer, 
  IPrimitivePaneView, 
  SeriesType, 
  Time 
} from 'lightweight-charts';

import { CanvasRenderingTarget2D } from 'fancy-canvas';
  
// Point definition
export interface IPoint {
  time: Time;
  price: number;
}
  
// Interface to store the coordinates of the line
interface ILineCoordinates {
  startX: number | null;
  startY: number | null;
  endX: number | null;
  endY: number | null;
}
  
//!----------------------------------------------------------------------------------------------------------------------------------------
//!---------------------------------------- Render a Line in Canvas -----------------------------------------------------------------------
//!----------------------------------------------------------------------------------------------------------------------------------------
  
class LinePaneRenderer implements IPrimitivePaneRenderer {
  private _points: ILineCoordinates;
  private _color: string;
  private _lineWidth: number;
  private _opacity: number;

  constructor(points: ILineCoordinates, color: string, lineWidth: number, opacity: number) {
    this._points = points;
    this._color = color;
    this._lineWidth = lineWidth;
    this._opacity = opacity;
  }

  draw(target: CanvasRenderingTarget2D): void {
    target.useBitmapCoordinateSpace((scope: any) => {
      const { startX, startY, endX, endY } = this._points;
      if (
        startX === null || startY === null ||
        endX === null || endY === null
      ) {          
        return;
      }

      const ctx = scope.context as CanvasRenderingContext2D;
      ctx.save();
      ctx.globalAlpha = this._opacity;
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = this._color;
      ctx.lineWidth = this._lineWidth;
      ctx.stroke();
      ctx.restore();
    });
  }
}

//!--------------------------------------------------------------------------------------------------------------------------------------
//!---------------------------------------- Compute the line coordinates ------------------------------------------------------------------
//!----------------------------------------------------------------------------------------------------------------------------------------
  
class LinePaneView implements IPrimitivePaneView {
  private _source: LineDrawingTool;
  private _points: ILineCoordinates = {
    startX: null,
    startY: null,
    endX: null,
    endY: null
  };

  constructor(source: LineDrawingTool) {
    this._source = source;
  }
    
  update(): void {
    const series = this._source.series;
    const chart = this._source.chart;
    const { start, end } = this._source;

    if (!chart || !series) {
      console.warn("⚠️ [LinePaneView] Cannot update the line: the chart has been removed.");
      return;
    }

    const startX = chart.timeScale().timeToCoordinate(start.time);
    const startY = series.priceToCoordinate(start.price);
    const endX = chart.timeScale().timeToCoordinate(end.time);
    const endY = series.priceToCoordinate(end.price);
    this._points = { startX, startY, endX, endY };
  }

  renderer(): IPrimitivePaneRenderer {
    return new LinePaneRenderer(
      this._points, 
      this._source.color, 
      this._source.lineWidth, 
      this._source.opacity
    );
  }
}
  
//!----------------------------------------------------------------------------------------------------------------------------------------
//!---------------------------------------- Main Class for Line Drawing Tool --------------------------------------------------------------
//!----------------------------------------------------------------------------------------------------------------------------------------
  
export class LineDrawingTool {
  public chart: IChartApi;
  public series: ISeriesApi<SeriesType>;
  public start: IPoint;
  public end: IPoint;
  public color: string;
  public lineWidth: number;
  public opacity: number;
  private _paneViews: LinePaneView[];

  constructor(
    chart: IChartApi,
    series: ISeriesApi<SeriesType>,
    start: IPoint,
    end: IPoint,
    color: string = 'blue',
    lineWidth: number = 2,
    opacity: number = 1.0
  ) {
    this.chart = chart;
    this.series = series;
    this.start = start;
    this.end = end;
    this.color = color;
    this.lineWidth = lineWidth;
    this.opacity = opacity;
    this._paneViews = [new LinePaneView(this)];

    // ¡Agregamos la actualización inicial para que se calculen las coordenadas!
    this.updateLine(this.start, this.end);
  }

  updateLine(newStart: IPoint, newEnd: IPoint): void {
    if (!this.chart || !this.series) {
      console.warn("⚠️ [LineDrawingTool] No se puede actualizar la línea: el gráfico ha sido eliminado.");
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
  
  