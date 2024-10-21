const AlarmInfoPanel = () => {
    return(
        <div className="flex flex-col align-center text-center border-4 border-red-500">
            --------------------Info Panel-------------------- <br/>
            [Button Select interval][Button select time frame]<br/>
            Dinamic Chart: <br/>
            X=Amount of alarms (numeric)<br/>
            Y=Time (Hours in day)<br/>
        </div>
    )

}

export default AlarmInfoPanel;