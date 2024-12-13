import { useMemo } from "react";
import countAlarmsByHour from "../utils/countAlarmsByHour";

/**
 * Hook personalizado para crear un dataset de alarmas por hora.
 *
 * @param {Array} alarmsData - Lista de todas las alarmas.
 * @param {Array} filteredByClickAlarmsData - Lista de alarmas filtradas por click.
 * @param {Array} filteredByOptionsAlarmsData - Lista de alarmas filtradas por opciones.
 * @returns {Object} Conjunto de datasets de alarmas por hora.
 */
const useAlarmsHourlyDataset  = (alarmsData, filteredByClickAlarmsData, filteredByOptionsAlarmsData) => {
    const dataSetAlarmsByHourArray = useMemo(() => countAlarmsByHour(alarmsData), [alarmsData]);
    const dataSetAlarmsByHourFilteredByClickArray = useMemo(() => countAlarmsByHour(filteredByClickAlarmsData), [filteredByClickAlarmsData]);    
    const dataSetAlarmsByHourFilteredByOptionsArray = useMemo(() => countAlarmsByHour(filteredByOptionsAlarmsData), [filteredByOptionsAlarmsData]);
  
    return { dataSetAlarmsByHourArray, dataSetAlarmsByHourFilteredByClickArray, dataSetAlarmsByHourFilteredByOptionsArray };
};

export default useAlarmsHourlyDataset;