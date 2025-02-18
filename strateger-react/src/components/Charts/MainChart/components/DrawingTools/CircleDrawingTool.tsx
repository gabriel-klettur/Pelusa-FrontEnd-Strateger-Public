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
  //!--------------------------------------------------  Dibuja el circulo en canvas --------------------------------------------------------
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
	  target.useBitmapCoordinateSpace((scope: any) => {							//scope es un objeto proporcionado por useBitmapCoordinateSpace() que encapsulta la informacion del canvas
		if (this._point.x === null || this._point.y === null) {
			console.log("❌ [CirclePaneRenderer] Cannot draw: Null coordinates", this._point);
		  	return;
		}
		if (this._point.x < 0 || this._point.y < 0) {
			console.log("⚠️ [CirclePaneRenderer] The point is outside the visible area of the chart, it will not be drawn.", this._point);
		  	return;
		}
		//console.log("✅ [CirclePaneRenderer] Drawing at coordinates:", this._point);
  
		const ctx = scope.context as CanvasRenderingContext2D;					// Obtiene el contexto del canvas, lo que permite dibujar
  
		ctx.save(); 															// Guarda el estado actual del contexto
		ctx.globalAlpha = this._opacity; 										// Establece una  opacidad
		ctx.beginPath();														// Inicia un nuevo trazo
		
		ctx.arc(this._point.x, this._point.y, this._radius, 0, 2 * Math.PI);	// Dibuja un circulo
		ctx.fillStyle = this._color; 											// Establece el color de relleno
		ctx.fill();																// Rellena el circulo
		
		ctx.strokeStyle = this._color;											// Establece el color de la linea
		ctx.lineWidth = 3;														// Establece el ancho de la linea
		ctx.stroke();															// Dibuja el circulo borde del circulo

		ctx.restore(); 															// Restaura el estado del contexto para no afectar otros dibujos
  		
	  });
	}
  }
  

  //!----------------------------------------------------------------------------------------------------------------------------------------
  //!------------------------------------------  Calcula la posicion del Circulo en el Grafico ----------------------------------------------
  //!----------------------------------------------------------------------------------------------------------------------------------------

  class CirclePaneView implements IPrimitivePaneView {
	private _source: CircleDrawingTool;
	private _point: ICircleCoordinates = { x: null, y: null };
  
	constructor(source: CircleDrawingTool) {
	  this._source = source;
	}
  
	// Método que calcula la posición del punto en el gráfico
	update(): void {
	  const series = this._source.series;
	  const chart = this._source.chart;
	  
	  // Usamos directamente el time original y el price original
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
  	
	// Call this method to update the position of the reference candle
	updateCircle(newPoint: IPoint): void {
	  //console.log("🔄 [CircleDrawingTool] Updating Circle:", newPoint);
	  this.point = newPoint;
	  this._paneViews.forEach((paneView) => {
		paneView.update();
	  });
	}
	
  
	paneViews(): IPrimitivePaneView[] {
	  return this._paneViews;
	}
  }
  