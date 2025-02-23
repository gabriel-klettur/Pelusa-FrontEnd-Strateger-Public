import { 
    ISeriesApi, 
    IChartApi, 
    IPrimitivePaneRenderer, 
    IPrimitivePaneView, 
    SeriesType, 
    Time 
  } from 'lightweight-charts';
  import { CanvasRenderingTarget2D } from 'fancy-canvas';
  
  // Definición del punto
  export interface IPoint {
    time: Time;
    price: number;
  }
  
  // Interfaz para almacenar las coordenadas del rectángulo en píxeles
  // (se define por la esquina superior izquierda, su ancho y alto)
  interface IRectangleCoordinates {
    x: number | null;
    y: number | null;
    width: number | null;
    height: number | null;
  }
  
  //--------------------------------------------------------------------------
  // Renderer: se encarga de dibujar el rectángulo en el canvas
  //--------------------------------------------------------------------------
  
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
          // No se dibuja si alguna coordenada es nula
          return;
        }
        const ctx = scope.context as CanvasRenderingContext2D;
        ctx.save();
        ctx.globalAlpha = this._opacity;
        // Si se define un color de relleno, se rellena el rectángulo
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
  
  //--------------------------------------------------------------------------
  // PaneView: se encarga de calcular las coordenadas del rectángulo
  //--------------------------------------------------------------------------
  
  class RectanglePaneView implements IPrimitivePaneView {
    private _source: RectangleDrawingTool;
    private _coords: IRectangleCoordinates = { x: null, y: null, width: null, height: null };
  
    constructor(source: RectangleDrawingTool) {
      this._source = source;
    }
  
    // Calcula las coordenadas en píxeles a partir de los puntos (start y end)
    update(): void {
      const chart = this._source.chart;
      const series = this._source.series;
      const { start, end } = this._source;

      if (!chart || !series) {
        console.warn("⚠️ [RectanglePaneView] No se puede actualizar: el gráfico o la serie han sido eliminados.");
        return;
      }

      const x1 = chart.timeScale().timeToCoordinate(start.time);
      const y1 = series.priceToCoordinate(start.price);
      const x2 = chart.timeScale().timeToCoordinate(end.time);
      const y2 = series.priceToCoordinate(end.price);

      if (x1 === null || y1 === null || x2 === null || y2 === null) {
        console.warn("⚠️ [RectanglePaneView] Coordenadas inválidas. No se actualizará el rectángulo.");
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
  
  //--------------------------------------------------------------------------
  // Clase principal: RectangleDrawingTool
  //--------------------------------------------------------------------------
  
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
  
    /**
     * Crea una instancia de la herramienta para dibujar rectángulos.
     * @param chart Instancia del gráfico.
     * @param series Instancia de la serie donde se dibuja.
     * @param start Punto de inicio (time/price).
     * @param end Punto opuesto (time/price).
     * @param color Color del borde.
     * @param lineWidth Grosor del borde.
     * @param opacity Opacidad.
     * @param fill Color de relleno (opcional).
     */
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
  
      // Actualizar las coordenadas inicialmente
      this.updateRectangle(this.start, this.end);
    }
  
    /**
     * Actualiza el rectángulo con nuevos puntos.
     * @param newStart Nuevo punto de inicio.
     * @param newEnd Nuevo punto opuesto.
     */
    
    updateRectangle(newStart: IPoint, newEnd: IPoint): void {
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
  