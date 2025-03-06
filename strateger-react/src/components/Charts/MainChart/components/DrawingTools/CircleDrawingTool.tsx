// Path: strateger-react/src/components/Charts/MainChart/components/CircleDrawingTool.tsx

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
  
  interface ICircleCoordinates {
	x: number | null;
	y: number | null;
  }
  
  //!----------------------------------------------------------------------------------------------------------------------------------------
  //!--------------------------------------------------  Draw a Circle in Canvas ------------------------------------------------------------
  //!----------------------------------------------------------------------------------------------------------------------------------------
  class CirclePaneRenderer implements IPrimitivePaneRenderer {
	private _point: ICircleCoordinates;
	private _color: string;
	private _radius: number;
	private _opacity: number;
  
	constructor(point: ICircleCoordinates, color: string, radius: number, opacity: number) {
	  this._point = point;
	  this._color = color;
	  this._radius = radius;
	  this._opacity = opacity;
	}
  
	draw(target: CanvasRenderingTarget2D): void {
	  target.useBitmapCoordinateSpace((scope: any) => {							
		if (this._point.x === null || this._point.y === null) {
			console.log("❌ [CirclePaneRenderer] Cannot draw: Null coordinates", this._point);
		  	return;
		}
		if (this._point.x < 0 || this._point.y < 0) {
			console.log("⚠️ [CirclePaneRenderer] The point is outside the visible area of the chart, it will not be drawn.", this._point);
		  	return;
		}
		
		const ctx = scope.context as CanvasRenderingContext2D;					//!<-- This is the key to access the canvas context
  
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
  

  //!----------------------------------------------------------------------------------------------------------------------------------------
  //!------------------------------------------  Compute the position of the circle in the chart --------------------------------------------
  //!----------------------------------------------------------------------------------------------------------------------------------------

  class CirclePaneView implements IPrimitivePaneView {
	private _source: CircleDrawingTool;
	private _point: ICircleCoordinates = { x: null, y: null };
  
	constructor(source: CircleDrawingTool) {
	  this._source = source;
	}
  	
	update(): void {
	  const series = this._source.series;
	  const chart = this._source.chart;
	  	  
	  const x = chart.timeScale().timeToCoordinate(this._source.point.time);
	  const y = series.priceToCoordinate(this._source.point.price);
	  
	  this._point = { x, y };
	}
  
	renderer(): IPrimitivePaneRenderer {
	  return new CirclePaneRenderer(this._point, this._source.color, this._source.radius, this._source.opacity);
	}
  }
  
  //!----------------------------------------------------------------------------------------------------------------------------------------
  //!--------------------------------  Clase principal, gestiona la logica del circulo y su actualizacion -----------------------------------
  //!----------------------------------------------------------------------------------------------------------------------------------------
  export class CircleDrawingTool {
	public chart: IChartApi;
	public series: ISeriesApi<SeriesType>;
	public point: IPoint;
	public color: string;
	public radius: number;
	public opacity: number;
	private _paneViews: CirclePaneView[];
  
	constructor(
	  chart: IChartApi,
	  series: ISeriesApi<SeriesType>,
	  point: IPoint,
	  color: string = 'red',
	  radius: number = 40,
	  opacity: number = 0.5

	) {
	  this.chart = chart;
	  this.series = series;
	  this.point = point;
	  this.color = color;
	  this.radius = radius
	  this.opacity = opacity;
	  this._paneViews = [new CirclePaneView(this)];
	}
  		
	updateCircle(newPoint: IPoint): void {
		if (!this.chart || !this.series) {
		  console.warn("⚠️ [CircleDrawingTool] Its not possible to update the circle: the chart or the series has been removed.");
		  return;
		}
		
		this.point = newPoint;
		this._paneViews.forEach((paneView) => {
		  paneView.update();
		});
	}
  
	paneViews(): IPrimitivePaneView[] {
		return this.chart ? this._paneViews : [];
	}
  }
  