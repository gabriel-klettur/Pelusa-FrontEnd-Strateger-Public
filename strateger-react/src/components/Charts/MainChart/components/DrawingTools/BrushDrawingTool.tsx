// Path: strateger-react/src/components/DrawingTools/BrushDrawingTool.tsx

import { 
	ISeriesApi, 
	IChartApi, 
	IPrimitivePaneRenderer, 
	IPrimitivePaneView, 
	SeriesType, 
	Time 
  } from 'lightweight-charts';
  import { CanvasRenderingTarget2D } from 'fancy-canvas';
  
  /** 
   * Definición del punto (time/price)
   */
  export interface IPoint {
	time: Time;
	price: number;
  }
  
  /**
   * Cada segmento de la brocha se define por un par de puntos.
   */
  export interface IBrushSegment {
	start: IPoint;
	end: IPoint;
  }
  
  /**
   * Interfaz para almacenar las coordenadas calculadas (en píxeles) para cada segmento.
   */
  interface IComputedBrushSegment {
	startX: number | null;
	startY: number | null;
	endX: number | null;
	endY: number | null;
  }
  
  /**
   * BrushPaneRenderer: Se encarga de dibujar todos los segmentos en el canvas.
   */
  class BrushPaneRenderer implements IPrimitivePaneRenderer {
	private _segments: IComputedBrushSegment[];
	private _color: string;
	private _lineWidth: number;
	private _opacity: number;
  
	constructor(segments: IComputedBrushSegment[], color: string, lineWidth: number, opacity: number) {
	  this._segments = segments;
	  this._color = color;
	  this._lineWidth = lineWidth;
	  this._opacity = opacity;
	  //console.log("BrushPaneRenderer: constructor", { segments, color, lineWidth, opacity });
	}
  
	draw(target: CanvasRenderingTarget2D): void {
	  //console.log("BrushPaneRenderer: draw() called");
	  target.useBitmapCoordinateSpace((scope: any) => {
		const ctx = scope.context as CanvasRenderingContext2D;
		ctx.save();
		ctx.globalAlpha = this._opacity;
		ctx.strokeStyle = this._color;
		ctx.lineWidth = this._lineWidth;
		ctx.beginPath();
		for (const seg of this._segments) {
		  if (seg.startX !== null && seg.startY !== null && seg.endX !== null && seg.endY !== null) {
			ctx.moveTo(seg.startX, seg.startY);
			ctx.lineTo(seg.endX, seg.endY);
		  }
		}
		ctx.stroke();
		ctx.restore();
		//console.log("BrushPaneRenderer: draw() finished");
	  });
	}
  }
  
  /**
   * BrushPaneView: Se encarga de calcular, a partir de los datos (time/price), 
   * las coordenadas en píxeles de cada segmento del trazo.
   */
  class BrushPaneView implements IPrimitivePaneView {
	private _source: BrushDrawingTool;
	private _computedSegments: IComputedBrushSegment[] = [];
  
	constructor(source: BrushDrawingTool) {
	  this._source = source;
	  //console.log("BrushPaneView: constructor called");
	}
  
	update(): void {
		const chart = this._source.chart;
		const series = this._source.series;
  
		if (!chart || !series) {
		  console.warn("⚠️ [BrushPaneView] No se puede actualizar: el gráfico o la serie han sido eliminados.");
		  return;
		}
  
		this._computedSegments = this._source.segments.map(seg => {
		  const startX = chart.timeScale().timeToCoordinate(seg.start.time);
		  const startY = series.priceToCoordinate(seg.start.price);
		  const endX = chart.timeScale().timeToCoordinate(seg.end.time);
		  const endY = series.priceToCoordinate(seg.end.price);
  
		  if (startX === null || startY === null || endX === null || endY === null) {
			console.warn("⚠️ [BrushPaneView] Coordenadas inválidas, ignorando segmento.");
			return { startX: null, startY: null, endX: null, endY: null };
		  }
  
		  return { startX, startY, endX, endY };
		}).filter(segment => segment.startX !== null && segment.startY !== null);
	}
  
	renderer(): IPrimitivePaneRenderer {
	  //console.log("BrushPaneView: renderer() called");
	  return new BrushPaneRenderer(this._computedSegments, this._source.color, this._source.lineWidth, this._source.opacity);
	}
  }
  
  /**
   * Clase principal: BrushDrawingTool
   * Esta herramienta representa un trazo de brocha compuesto por varios segmentos.
   */
  export class BrushDrawingTool {
	public chart: IChartApi;
	public series: ISeriesApi<SeriesType>;
	public segments: IBrushSegment[];
	public color: string;
	public lineWidth: number;
	public opacity: number;
	private _paneViews: BrushPaneView[];
  
	/**
	 * Crea una instancia de la herramienta para la brocha.
	 * @param chart Instancia del gráfico.
	 * @param series Instancia de la serie donde se dibuja.
	 * @param start Punto inicial del primer segmento.
	 * @param end Punto final del primer segmento.
	 * @param color Color del trazo.
	 * @param lineWidth Grosor del trazo.
	 * @param opacity Opacidad del trazo.
	 */
	constructor(
	  chart: IChartApi,
	  series: ISeriesApi<SeriesType>,
	  start: IPoint,
	  end: IPoint,
	  color: string = 'black',
	  lineWidth: number = 3,
	  opacity: number = 1.0
	) {
	  this.chart = chart;
	  this.series = series;
	  // Iniciamos el trazo con el primer segmento.
	  this.segments = [{ start, end }];
	  this.color = color;
	  this.lineWidth = lineWidth;
	  this.opacity = opacity;
	  this._paneViews = [new BrushPaneView(this)];
	  //console.log("BrushDrawingTool: constructor called", { start, end, color, lineWidth, opacity });
	  
	  // Se elimina el código de adjuntar la primitiva aquí (lo haremos desde el hook)
	  
	  // Actualizamos el trazo inicialmente.
	  this.updateBrush();
	}
  
	/**
	 * Agrega un nuevo segmento al trazo y actualiza la vista.
	 * @param start Punto de inicio del segmento.
	 * @param end Punto final del segmento.
	 */
	addSegment(start: IPoint, end: IPoint): void {
	  this.segments.push({ start, end });
	  this._paneViews.forEach(view => view.update());
	  //console.log("BrushDrawingTool: addSegment called", { start, end });
	}
  
	/**
	 * Actualiza todos los segmentos del trazo (por ejemplo, al cambiar el rango visible).
	 */
	updateBrush(): void {
	  this._paneViews.forEach(view => view.update());
	  if (!this.chart || !this.series) {
        console.warn("⚠️ [BrushDrawingTool] No se puede actualizar la brocha: el gráfico ha sido eliminado.");
        return;
      }
	  //console.log("BrushDrawingTool: updateBrush called");
	}
  
	paneViews(): IPrimitivePaneView[] {
		return this.chart ? this._paneViews : [];
	}
  }
  