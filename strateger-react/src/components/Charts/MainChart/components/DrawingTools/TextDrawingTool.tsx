// Path: strateger-react/src/components/DrawingTools/TextDrawingTool.tsx

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
  
//!----------------------------------------------------------------------------------------------------------------------------------------
//!--------------------------------------------------  Draw a Text in Canvas  -------------------------------------------------------------
//!----------------------------------------------------------------------------------------------------------------------------------------
class TextPaneRenderer implements IPrimitivePaneRenderer {
  private _x: number | null;
  private _y: number | null;
  private _text: string;
  private _color: string;
  private _font: string;

  constructor(x: number | null, y: number | null, text: string, color: string, font: string) {
    this._x = x;
    this._y = y;
    this._text = text;
    this._color = color;
    this._font = font;
  }

  draw(target: CanvasRenderingTarget2D): void {
    target.useBitmapCoordinateSpace((scope: any) => {
      const ctx = scope.context as CanvasRenderingContext2D;
      if (this._x === null || this._y === null) return;
      ctx.save();
      ctx.fillStyle = this._color;
      ctx.font = this._font;
      ctx.fillText(this._text, this._x, this._y);
      ctx.restore();
    });
  }
}
  
//!----------------------------------------------------------------------------------------------------------------------------------------
//!--------------------------------------------------  Compute the Text Position  ---------------------------------------------------------
//!----------------------------------------------------------------------------------------------------------------------------------------
class TextPaneView implements IPrimitivePaneView {
  private _source: TextDrawingTool;
  private _x: number | null = null;
  private _y: number | null = null;

  constructor(source: TextDrawingTool) {
    this._source = source;
  }

  update(): void {
    const chart = this._source.chart;
    const series = this._source.series;
    const { time, price } = this._source.point;
    this._x = chart.timeScale().timeToCoordinate(time);
    this._y = series.priceToCoordinate(price);
  }

  renderer(): IPrimitivePaneRenderer {
    return new TextPaneRenderer(this._x, this._y, this._source.text, this._source.color, this._source.font);
  }
}

//!----------------------------------------------------------------------------------------------------------------------------------------
//!--------------------------------------------------  Main Class TextDrawingTool  --------------------------------------------------------
//!----------------------------------------------------------------------------------------------------------------------------------------
export class TextDrawingTool {
  public chart: IChartApi;
  public series: ISeriesApi<SeriesType>;
  public point: IPoint;
  public text: string;
  public color: string;
  public font: string;
  private _paneViews: TextPaneView[];

  constructor(
    chart: IChartApi,
    series: ISeriesApi<SeriesType>,
    point: IPoint,
    text: string,
    color: string = 'black',
    font: string = '16px Arial'
  ) {
    this.chart = chart;
    this.series = series;
    this.point = point;
    this.text = text;
    this.color = color;
    this.font = font;
    this._paneViews = [new TextPaneView(this)];
    this.updateText(this.text);
  }

  updateText(newText: string): void {
    this.text = newText;
    this._paneViews.forEach(view => view.update());
  }

  paneViews(): IPrimitivePaneView[] {
    return this._paneViews;
  }
}
  