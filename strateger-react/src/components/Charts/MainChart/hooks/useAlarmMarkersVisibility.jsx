import { useSelector } from 'react-redux';

import { selectAlarmButtons, selectSelectedAlarmsButton, selectFilteredAlarmsButton } from 'reduxStore/interaction';

const useAlarmMarkersVisibility = () => {
    const alarmMarkersSettings = {
        showAlarmsMarkers: useSelector(selectAlarmButtons),
        showAlarmsSelectedMarkers: useSelector(selectSelectedAlarmsButton),
        showAlarmsFilteredMarkers: useSelector(selectFilteredAlarmsButton),
    };

    return alarmMarkersSettings;
}

export default useAlarmMarkersVisibility;