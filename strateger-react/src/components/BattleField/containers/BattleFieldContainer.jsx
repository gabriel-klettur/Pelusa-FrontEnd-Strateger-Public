const BattleFieldContainer = () => {
    // La actualizacion de cada panel aqui deberia ser cada 1 segundo

    return(
        <>
            <div className="flex flex-col">
                <div className="grid grid-cols-10 gap-1 border-4 border-black">
                    <div className="col-span-7 border-4 border-red-500">
                        <div className="flex justify-center items-center border-4 border-green-500">
                            CHART Con la posibilidad de mostrar alarmas, estrateigas y ordenes.
                        </div>                        
                    </div>                    
                    <div className="col-span-3 border-4 border-blue-500">
                        Panel Negociador / 
                        Panel de Informacion (Indicador de Volatilidad)
                    </div>                                
                </div>
                <div className="grid grid-cols-3 gap-1 border-4 border-black">
                    <div className="h-full w-full border-4 border-green-500">
                        Activador/Desactivador de Alarmas. 
                        Tabla con nombre de la alarma y boton de Pause/Run o en el caso de alarmas de tradingview enlace para desactivarlas e instrucciones
                    </div>
                    <div className="border-4 border-red-500">
                        Estrategias Activas y Pausadas
                        Tabla con el nombre de la estrategia y en la primer fila la estrategia 'MANUAL' para asi esconder resultados de estrategias.
                        En las estrategias boton de run/pause y stop
                    </div>
                    <div className="border-4 border-blue-500">
                        Tabla Ordenes Realizadas y en espera
                    </div>
                </div>
                <div className="border-4 border-cyan-500">
                    ESTADISTICAS con tablas y graficos
                </div>
            </div>
        </>
    )
}

export default BattleFieldContainer;