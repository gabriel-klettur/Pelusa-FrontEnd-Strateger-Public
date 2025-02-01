// Path: strateger-react/src/components/Charts/MainChart/components/PointDrawingTool.tsx

import { 
	ISeriesApi, 
	IChartApi, 
	ISeriesPrimitivePaneRenderer, 
	ISeriesPrimitivePaneView, 
	SeriesType, 
	Time 
  } from 'lightweight-charts';
  import { CanvasRenderingTarget2D } from 'fancy-canvas';
  
  export interface IPoint {
	time: Time;
	price: number;
  }
  
  interface IPointCoordinates {
	x: number | null;
	y: number | null;
  }
  
  // 🎯 1️⃣ Renderer that draws the point with a configurable radius
  class PointPaneRenderer implements ISeriesPrimitivePaneRenderer {
	private _point: IPointCoordinates;
	private _color: string;
	private _radius: number;
  
	constructor(point: IPointCoordinates, color: string, radius: number) {
	  this._point = point;
	  this._color = color;
	  this._radius = radius;
	}
  
	draw(target: CanvasRenderingTarget2D): void {
	  target.useBitmapCoordinateSpace((scope: any) => {
		if (this._point.x === null || this._point.y === null) {
			console.log("❌ [PointPaneRenderer] Cannot draw: Null coordinates", this._point);
		  	return;
		}
		if (this._point.x < 0 || this._point.y < 0) {
			console.log("⚠️ [PointPaneRenderer] The point is outside the visible area of the chart, it will not be drawn.", this._point);
		  	return;
		}
		console.log("✅ [PointPaneRenderer] Drawing at coordinates:", this._point);
  
		const ctx = scope.context as CanvasRenderingContext2D;
		ctx.fillStyle = this._color;
  
		// Draw the circle with the specified radius
		ctx.beginPath();
		ctx.arc(this._point.x, this._point.y, this._radius, 0, 2 * Math.PI);
		ctx.fill();
		ctx.stroke();
  
		// Draw a crosshair with the double radius in the same position
		ctx.beginPath();
		ctx.moveTo(this._point.x - this._radius * 1.5, this._point.y);
		ctx.lineTo(this._point.x + this._radius * 1.5, this._point.y);
		ctx.moveTo(this._point.x, this._point.y - this._radius * 1.5);
		ctx.lineTo(this._point.x, this._point.y + this._radius * 1.5);
		ctx.strokeStyle = 'red';
		ctx.lineWidth = 2;
		ctx.stroke();
  		
		// Draw a circle in the center of the crosshair
		ctx.beginPath();
		ctx.arc(200, 200, 10, 0, 2 * Math.PI);
		ctx.fillStyle = 'yellow';
		ctx.fill();
		ctx.stroke();
	  });
	}
  }
  

  // 🎯 2️⃣ View of the point, thats calculate the position in the chart
  class PointPaneView implements ISeriesPrimitivePaneView {
	private _source: PointDrawingTool;
	private _point: IPointCoordinates = { x: null, y: null };
  
	constructor(source: PointDrawingTool) {
	  this._source = source;
	}
  
	//Method that calculates the position of the point in the chart
	update(): void {
	  console.log("🔄 [PointPaneView] update()");
  
	  const series = this._source.series;
	  const chart = this._source.chart;
  
	  // get the visible range of the chart
	  const visibleRange = chart.timeScale().getVisibleRange();
	  if (!visibleRange) {
		console.log("⏳ [PointPaneView] Waiting for the visible range of the chart...");		
		return;
	  }
  
	  // Use the time of the point, but adjust it to be within the visible range
	  let adjustedTime = this._source.point.time;
	  if (adjustedTime < visibleRange.from) {
		adjustedTime = visibleRange.from;
	  } else if (adjustedTime > visibleRange.to) {
		adjustedTime = visibleRange.to;
	  }
  
	  // Convert the time and price to coordinates
	  const x = chart.timeScale().timeToCoordinate(adjustedTime);
	  const y = series.priceToCoordinate(this._source.point.price);
  
	  console.log("🔍 [PointPaneView] Converted coordinates:", { x, y });
	  this._point = { x, y };
	}
  
	renderer(): ISeriesPrimitivePaneRenderer {
	  return new PointPaneRenderer(this._point, this._source.color, this._source.radius);
	}
  }
  
  // 🎯 3️⃣ Drawing tool that allows to draw a point in the chart  
  export class PointDrawingTool {
	public chart: IChartApi;
	public series: ISeriesApi<SeriesType>;
	public point: IPoint;
	public color: string;
	public radius: number;
	private _paneViews: PointPaneView[];
  
	constructor(
	  chart: IChartApi,
	  series: ISeriesApi<SeriesType>,
	  point: IPoint,
	  color: string = 'red',
	  radius: number = 40
	) {
	  this.chart = chart;
	  this.series = series;
	  this.point = point;
	  this.color = color;
	  this.radius = radius;
	  this._paneViews = [new PointPaneView(this)];
	}
  	
	// Call this method to update the position of the reference candle
	updatePoint(newPoint: IPoint): void {
	  console.log("🔄 [PointDrawingTool] Updating Point:", newPoint);
	  this.point = newPoint;
	  this._paneViews.forEach((paneView) => {
		paneView.update();
	  });
	}
  
	paneViews(): ISeriesPrimitivePaneView[] {
	  return this._paneViews;
	}
  }
  